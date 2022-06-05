const express = require("express")

const multer = require("multer")
const fs = require("fs")

const router = express.Router()
const sizeOf = require("image-size")
const jwt = require("jsonwebtoken")
const sharp = require("sharp")
const { v4: uuidv4 } = require("uuid")
const { uploadFile, getFileStream, deleteFile } = require("../s3")
const UserModel = require("../models/user.model")
const GlobalModel = require("../models/global.model")

require("dotenv").config()

/* Router functions */
const verifyFormDataUserToken = (token) => new Promise((resolve, reject) => {
    if (token) {
        const secretKey = process.env.ACCESS_TOKEN_SECRET
        jwt.verify(token, secretKey, {}, (err, decodedUser) => {
            if (err) {
                reject(err)
            } else if (decodedUser.email) {
                resolve(decodedUser.email)
            } else {
                reject(new Error("Token was not validated"))
            }
        })
    } else {
        resolve({
            success: false,
            message: "Forbidden: Token was bad"
        })
    }
})

const verifyToken = (req, res, next) => {
    const { token } = req.body
    if (token) {
        const secretKey = process.env.ACCESS_TOKEN_SECRET
        jwt.verify(token, secretKey, {}, (err, decodedUser) => {
            if (err) {
                res.status(err.status).send(err.message)
            } else if (decodedUser.email) {
                req.email = decodedUser.email
                next()
            } else {
                res.status(400).send({
                    message: "Token was not validated"
                })
            }
        })
    }
}

const getUser = (email) => new Promise((resolve, reject) => {
    UserModel
        .findOne(
            { email },
            {},
            {},
            (err, user) => {
                if (err) {
                    reject(err)
                } else if (user) {
                    resolve(user)
                } else {
                    reject(new Error("User was not found"))
                }
            }
        )
})

const updateUserImageCrop = (userEmail, keys) => new Promise((resolve, reject) => {
    UserModel
        .findOneAndUpdate(
            {
                email: userEmail,
                "images.originalKey": keys.originalKey
            },
            { $set: { "images.$.smallKey": keys.smallKey, "images.$.mediumKey": keys.mediumKey } },
            { new: true },
            (err, docs) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(docs)
                }
            }
        )
})

const addUserImage = (userEmail, keys) => new Promise((resolve, reject) => {
    UserModel
        .findOneAndUpdate(
            { email: userEmail },
            {
                $push: {
                    images: {
                        originalKey: keys.originalKey,
                        smallKey: keys.smallKey,
                        mediumKey: keys.mediumKey,
                        largeKey: keys.largeKey,
                        comment: ""
                    }
                }
            },
            { new: true },
            (err, docs) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(docs)
                }
            }
        )
})

const getGlobalImages = () => new Promise((resolve, reject) => {
    GlobalModel
        .findOne(
            { type: "images" },
            (err, docs) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(docs.data)
                }
            }
        )
})

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images")
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage: fileStorageEngine })

const getDimensions = (file, size) => {
    const imageDimensions = sizeOf(file.path)
    const imageRatio = imageDimensions.width / imageDimensions.height
    const refRatio = Number(size.x) / Number(size.y)
    if (imageRatio < refRatio) {
        if (imageDimensions.height > Number(size.y)) {
            const height = Number(size.y)
            const width = imageDimensions.width * (Number(size.y) / imageDimensions.height)
            return { width, height }
        }
        return { width: imageDimensions.width, height: imageDimensions.height }
    }
    if (imageRatio > refRatio) {
        if (imageDimensions.width > Number(size.x)) {
            const width = Number(size.x)
            const height = imageDimensions.height * (Number(size.x) / imageDimensions.width)
            return { width, height }
        }
        return { width: imageDimensions.width, height: imageDimensions.height }
    }
    return { width: Number(size.x), height: Number(size.y) }
}

const getImageSize = (file, size) => new Promise((resolve, reject) => {
    const dimensions = getDimensions(file, size)
    const name = `${uuidv4()}.webp`
    const path = `images/${name}`
    sharp(file.path)
        .resize(Math.round(dimensions.width), Math.round(dimensions.height), {
            fit: "contain",
            background: {
                r: 255,
                g: 255,
                b: 255,
                alpha: 0
            }
        })
        .toFile(
            path,
            (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve({
                        name,
                        path
                    })
                }
            }
        )
})

const getImages = async (file, globalImages) => {
    const small = await getImageSize(file, globalImages.sizes.small)
    const medium = await getImageSize(file, globalImages.sizes.medium)
    const large = await getImageSize(file, globalImages.sizes.large)
    return {
        small,
        medium,
        large
    }
}

const getCropImages = async (file, globalImages) => {
    const small = await getImageSize(file, globalImages.sizes.small)
    const medium = await getImageSize(file, globalImages.sizes.medium)
    return {
        small,
        medium
    }
}

const imageMaxValidation = (user, imageMax) => new Promise((resolve, reject) => {
    if (user.images.length >= imageMax) {
        reject(new Error(`Not Allowed: Max image quantity is ${imageMax}`))
    } else {
        resolve()
    }
})

const imageSizeValidation = (imageSize, maxImageSize) => new Promise((resolve, reject) => {
    if (imageSize > maxImageSize) {
        reject(new Error(`Not Allowed: Image is bigger than ${maxImageSize}Bits`))
    } else {
        resolve()
    }
})

/* Profile Images Routs */
router.put("/update-comment/:key", verifyToken, async (req, res) => {
    try {
        const { key } = req.params
        UserModel
            .findOneAndUpdate(
                {
                    email: req.email,
                    "images.smallKey": key
                },
                {
                    $set: { "images.$.comment": req.body.comment }
                },
                {
                    new: true
                },
                (err, docs) => {
                    if (err) {
                        res.status(400).send(err)
                    } else {
                        const imageItem = docs.images.find((item) => item.smallKey === key)
                        res.status(200).json({
                            imageItem
                        })
                    }
                }
            )
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.get("/get-image/:key", async (req, res) => {
    try {
        const fileReadStream = await getFileStream(req.params.key)
        fileReadStream.on("error", () => {
            const stream = fs.createReadStream("./assets/images/placeholder-image-not-available.jpg")
            stream.pipe(res)
        })
        fileReadStream.pipe(res)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.delete("/delete-image", verifyToken, async (req, res) => {
    try {
        UserModel
            .findOneAndUpdate(
                { email: req.email },
                { $pull: { images: { originalKey: req.body.image.originalKey } } },
                { new: true },
                async (err, docs) => {
                    if (err) {
                        res.status(400).send(err)
                    } else {
                        deleteFile(req.body.image.originalKey)
                        deleteFile(req.body.image.smallKey)
                        deleteFile(req.body.image.mediumKey)
                        deleteFile(req.body.image.largeKey)
                        res.status(200).json({
                            images: docs.images || []
                        })
                    }
                }
            )
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.put("/rearrange", verifyToken, async (req, res) => {
    try {
        UserModel
            .findOneAndUpdate(
                { email: req.email },
                { images: req.body.images },
                { new: true },
                async (err, docs) => {
                    if (err) {
                        res.status.send(err)
                    } else {
                        res.status(200).json({
                            images: docs.images
                        })
                    }
                }
            )
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.put("/crop-image", upload.single("image"), async (req, res) => {
    try {
        const imageIndex = Number(req.body.imageIndex)
        const userEmail = await verifyFormDataUserToken(req.body.token)
        const user = await getUser(userEmail)
        const globalImages = await getGlobalImages()
        await imageSizeValidation(req.file.size, globalImages.maxImageSize)
        const cropSizes = await getCropImages(req.file, globalImages)
        await deleteFile(user.images[imageIndex].smallKey)
        await deleteFile(user.images[imageIndex].mediumKey)
        const smallKey = await uploadFile(cropSizes.small.path, cropSizes.small.name)
        const mediumKey = await uploadFile(cropSizes.medium.path, cropSizes.medium.name)
        const docs = await updateUserImageCrop(userEmail, {
            smallKey, mediumKey, originalKey: user.images[imageIndex].originalKey
        })
        res.status(201).json({
            message: "Image crop was updated successfully",
            images: docs.images
        })
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.post("/upload", upload.single("image"), async (req, res) => {
    try {
        const userEmail = await verifyFormDataUserToken(req.body.token)
        const user = await getUser(userEmail)
        const globalImages = await getGlobalImages()
        await imageMaxValidation(user, globalImages.maxImages)
        await imageSizeValidation(req.file.size, globalImages.maxImageSize)
        const sizes = await getImages(req.file, globalImages)
        const originalKey = await uploadFile(req.file.path, req.file.filename)
        const smallKey = await uploadFile(sizes.small.path, sizes.small.name)
        const mediumKey = await uploadFile(sizes.medium.path, sizes.medium.name)
        const largeKey = await uploadFile(sizes.large.path, sizes.large.name)
        const docs = await addUserImage(userEmail, {
            originalKey, smallKey, mediumKey, largeKey
        })
        res.status(201).json({
            message: "Image was saved successfully",
            images: docs.images
        })
    } catch (err) {
        res.status(400).send(err.message)
    }
})

module.exports = router
