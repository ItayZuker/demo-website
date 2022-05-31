const express = require("express")

const multer = require("multer")
const fs = require("fs")

const router = express.Router()
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
                reject(new Error(err))
            } else if (decodedUser.email) {
                resolve(decodedUser.email)
            } else {
                reject(new Error({
                    success: false,
                    message: "Forbidden: Token was bad"
                }))
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
                res.send(err)
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

const getUser = (email) => new Promise((resolve, reject) => {
    UserModel
        .findOne(
            { email },
            {},
            {},
            (err, user) => {
                if (err) {
                    reject(new Error(err))
                } else if (user) {
                    resolve(user)
                } else {
                    reject(new Error("User was not found"))
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
                        smallKey: keys.smallKey,
                        mediumKey: keys.mediumKey,
                        largeKey: keys.largeKey,
                        comment: ""
                    }
                }
            },
            { new: true },
            async (err, docs) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(docs)
                }
            }
        )
})

const getImagesQuantity = async (email) => {
    const user = await getUser((email))
    return user.images.length
}

const getGlobalImages = () => new Promise((resolve, reject) => {
    GlobalModel
        .findOne(
            { type: "images" },
            (err, docs) => {
                if (err) {
                    reject(new Error(err))
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

const getSmall = (file, size) => new Promise((resolve, reject) => {
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

const getMedium = (file, size) => new Promise((resolve, reject) => {
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

const getLarge = (file, size) => new Promise((resolve, reject) => {
    const name = `${uuidv4()}.webp`
    const path = `images/${name}`
    sharp(file.path)
        .resize(Number(size.x), Number(size.y), {
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
    const small = await getSmall(file, globalImages.sizes.small)
    const medium = await getMedium(file, globalImages.sizes.medium)
    const large = await getLarge(file, globalImages.sizes.large)
    return {
        small,
        medium,
        large
    }
}

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
                        res.send(err)
                    } else {
                        const imageItem = docs.images.find((item) => item.smallKey === key)
                        res.status(200).json({
                            imageItem
                        })
                    }
                }
            )
    } catch (err) {
        res.send(err)
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
        res.send(err)
    }
})

router.delete("/delete-image/:key", verifyToken, async (req, res) => {
    try {
        UserModel
            .findOneAndUpdate(
                { email: req.email },
                { $pull: { images: { smallKey: req.params.key } } },
                { new: true },
                async (err, docs) => {
                    if (err) {
                        res.send(err)
                    } else {
                        deleteFile(req.params.key)
                        res.status(200).json({
                            images: docs.images || []
                        })
                    }
                }
            )
    } catch (err) {
        res.send(err)
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
                        res.send(err)
                    } else {
                        res.status(200).json({
                            images: docs.images
                        })
                    }
                }
            )
    } catch (err) {
        fs.unlinkSync(req.file.path)
        res.send(err)
    }
})

router.post("/upload", upload.single("image"), async (req, res) => {
    try {
        const globalImages = await getGlobalImages()
        const userEmail = await verifyFormDataUserToken(req.body.token)
        const imageQuantity = await getImagesQuantity(userEmail)
        if (imageQuantity >= globalImages.max) {
            res.status(405).json({
                message: `Not Allowed: Max image quantity is ${globalImages.max}`
            })
        } else {
            const sizes = await getImages(req.file, globalImages)
            const smallKey = await uploadFile(sizes.small.path, sizes.small.name)
            const mediumKey = await uploadFile(sizes.medium.path, sizes.medium.name)
            const largeKey = await uploadFile(sizes.large.path, sizes.large.name)
            fs.unlinkSync(req.file.path)
            fs.unlinkSync(sizes.small.path)
            fs.unlinkSync(sizes.medium.path)
            fs.unlinkSync(sizes.large.path)
            const user = await addUserImage(userEmail, { smallKey, mediumKey, largeKey })
            res.status(201).json({
                message: "Image was saved successfully",
                images: user.images
            })
        }
    } catch (err) {
        fs.unlinkSync(req.file.path)
        res.send(err)
    }
})

module.exports = router
