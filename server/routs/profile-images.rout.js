const express = require("express")

const multer = require("multer")
const fs = require("fs")

const upload = multer({ dest: "images/" })
const router = express.Router()
const jwt = require("jsonwebtoken")
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

const addUserImage = (userEmail, key) => new Promise((resolve, reject) => {
    UserModel
        .findOneAndUpdate(
            { email: userEmail },
            { $push: { images: { key, comment: "" } } },
            {},
            async (err) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(true)
                }
            }
        )
})

const getImagesQuantity = async (email) => {
    const user = await getUser((email))
    return user.images.length
}

const getImageMax = () => new Promise((resolve, reject) => {
    GlobalModel.findOne(
        { type: "imageMax" },
        (err, docs) => {
            if (err) {
                reject(new Error(err))
            } else {
                const data = docs.list.find((item) => item.type === "max")
                resolve(data.value)
            }
        }
    )
})

/* Profile Images Routs */
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
                { $pull: { images: { key: req.params.key } } },
                { new: true },
                async (err) => {
                    if (err) {
                        res.send(err)
                    } else {
                        const user = await getUser(req.email)
                        deleteFile(req.params.key)
                        res.status(200).json({
                            images: user.images || []
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
                {},
                async (err) => {
                    if (err) {
                        res.send(err)
                    } else {
                        const user = await getUser(req.email)
                        res.status(200).json({
                            images: user.images
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
        const imageMax = await getImageMax()
        const userEmail = await verifyFormDataUserToken(req.body.token)
        const imageQuantity = await getImagesQuantity(userEmail)
        if (imageQuantity >= imageMax) {
            res.status(405).json({
                message: `Not Allowed: Max image quantity is ${imageMax}`
            })
        } else {
            const key = await uploadFile(req.file)
            fs.unlinkSync(req.file.path)
            await addUserImage(userEmail, key)
            const user = await getUser(userEmail)
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
