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
const verifyFormDataUserToken = (res, token) => new Promise((resolve) => {
    if (token) {
        const secretKey = process.env.ACCESS_TOKEN_SECRET
        jwt.verify(token, secretKey, {}, (err, decodedUser) => {
            if (err) {
                res.status(400).send(err)
            } else if (decodedUser.email) {
                resolve(decodedUser.email)
            } else {
                res.status(405).json({
                    message: "Token was not validated"
                })
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
                res.status(400).send(err)
            } else if (decodedUser.email) {
                req.email = decodedUser.email
                next()
            } else {
                res.status(403).send({
                    success: false,
                    message: "Forbidden: Token was bad"
                })
            }
        })
    }
}

const getUser = (res, email) => new Promise((resolve) => {
    UserModel
        .findOne(
            { email },
            {},
            {},
            (err, user) => {
                if (err) {
                    res.status(400).send(err)
                } else if (user) {
                    resolve(user)
                } else {
                    res.status(404).json({
                        message: "User was not found"
                    })
                }
            }
        )
})

const updateUserImageCrop = (res, userEmail, keys) => new Promise((resolve, reject) => {
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

const addUserImage = (res, userEmail, keys) => new Promise((resolve, reject) => {
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

const getGlobalImages = (res) => new Promise((resolve) => {
    GlobalModel
        .findOne(
            { type: "images" },
            (err, docs) => {
                if (err) {
                    res.status(400).send(err)
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

const getSmall = (res, file, size) => new Promise((resolve, reject) => {
    const name = `${uuidv4()}.webp`
    const path = `images/${name}`
    sharp(file.path)
        .resize(Number(size.x), Number(size.y))
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

const getMedium = (res, file, size) => new Promise((resolve) => {
    const name = `${uuidv4()}.webp`
    const path = `images/${name}`
    sharp(file.path)
        .resize(Number(size.x), Number(size.y))
        .toFile(
            path,
            (err) => {
                if (err) {
                    res.status(400).send(err)
                } else {
                    resolve({
                        name,
                        path
                    })
                }
            }
        )
})

const getLarge = (res, file, size) => new Promise((resolve) => {
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
                    res.status(400).send(err)
                } else {
                    resolve({
                        name,
                        path
                    })
                }
            }
        )
})

const getImages = async (res, file, globalImages) => {
    const small = await getSmall(res, file, globalImages.sizes.small)
    const medium = await getMedium(res, file, globalImages.sizes.medium)
    const large = await getLarge(res, file, globalImages.sizes.large)
    return {
        small,
        medium,
        large
    }
}

const getCropImages = async (res, file, globalImages) => {
    const small = await getSmall(res, file, globalImages.sizes.small)
    const medium = await getMedium(res, file, globalImages.sizes.medium)
    return {
        small,
        medium
    }
}

const imageMaxValidation = (res, user, imageMax) => new Promise((resolve) => {
    if (user.images.length >= imageMax) {
        res.status(405).json({
            message: `Not Allowed: Max image quantity is ${imageMax}`
        })
    } else {
        resolve()
    }
})

const imageSizeValidation = (res, imageSize, maxImageSize) => new Promise((resolve) => {
    if (imageSize > maxImageSize) {
        res.status(405).json({
            message: `Not Allowed: Image is bigger than ${maxImageSize}Bits`
        })
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
                        deleteFile(res, req.body.image.originalKey)
                        deleteFile(res, req.body.image.smallKey)
                        deleteFile(res, req.body.image.mediumKey)
                        deleteFile(res, req.body.image.largeKey)
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
        const userEmail = await verifyFormDataUserToken(res, req.body.token)
        const user = await getUser(res, userEmail)
        const globalImages = await getGlobalImages(res)
        await imageSizeValidation(res, req.file.size, globalImages.maxImageSize)
        const cropSizes = await getCropImages(res, req.file, globalImages)
        await deleteFile(res, user.images[imageIndex].smallKey)
        await deleteFile(res, user.images[imageIndex].mediumKey)
        const smallKey = await uploadFile(res, cropSizes.small.path, cropSizes.small.name)
        const mediumKey = await uploadFile(res, cropSizes.medium.path, cropSizes.medium.name)
        const docs = await updateUserImageCrop(res, userEmail, {
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
        const userEmail = await verifyFormDataUserToken(res, req.body.token)
        const user = await getUser(res, userEmail)
        const globalImages = await getGlobalImages(res)
        await imageMaxValidation(res, user, globalImages.maxImages)
        await imageSizeValidation(res, req.file.size, globalImages.maxImageSize)
        const sizes = await getImages(res, req.file, globalImages)
        const originalKey = await uploadFile(res, req.file.path, req.file.filename)
        const smallKey = await uploadFile(res, sizes.small.path, sizes.small.name)
        const mediumKey = await uploadFile(res, sizes.medium.path, sizes.medium.name)
        const largeKey = await uploadFile(res, sizes.large.path, sizes.large.name)
        const docs = await addUserImage(res, userEmail, {
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
