const express = require("express")

const multer = require("multer")

const fs = require("fs")

const upload = multer({ dest: "images/" })
const router = express.Router()
const jwt = require("jsonwebtoken")
const { uploadFile, getFile, deleteFile } = require("../s3")
const UserModel = require("../models/user.model")

require("dotenv").config()

/* Router functions */
const verifyFormDataUserToken = (token) => new Promise((resolve, reject) => {
    if (token) {
        const secretKey = process.env.ACCESS_TOKEN_SECRET
        jwt.verify(token, secretKey, {}, (err, decodedUser) => {
            if (err) {
                reject(new Error(err))
            } else if (decodedUser.email) {
                resolve({
                    success: true,
                    email: decodedUser.email
                })
            } else {
                resolve({
                    success: false,
                    message: "Forbidden: Token was bad"
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

const getUser = (email) => new Promise((resolve) => {
    UserModel
        .findOne(
            { email },
            {},
            {},
            (err, user) => {
                if (err) {
                    resolve({
                        success: false,
                        user: {},
                        err
                    })
                } else if (user) {
                    resolve({
                        success: true,
                        data: user,
                        err: false
                    })
                } else {
                    resolve({
                        success: false,
                        user: {},
                        err: false
                    })
                }
            }
        )
})

const addUserImage = (userEmail, imageKey) => new Promise((resolve, reject) => {
    UserModel
        .findOneAndUpdate(
            { email: userEmail },
            { $push: { images: imageKey } },
            {},
            async (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve({
                        success: true
                    })
                }
            }
        )
})

const getImagesQuantity = async (email) => {
    const user = await getUser((email))
    return user.data.images.length
}

/* Profile Images Routs */
router.post("/get-image/:key", async (req, res) => {
    try {
        const imageKey = req.params.key
        const file = await getFile(imageKey)
        res.status(200).json({
            buffer: file.data.Body,
            key: imageKey
        })
    } catch (err) {
        res.send(err)
    }
})

router.delete("/delete-image", verifyToken, async (req, res) => {
    try {
        UserModel
            .findOneAndUpdate(
                { email: req.email },
                { $pull: { images: req.body.imageKey } },
                {},
                async (err) => {
                    if (err) {
                        res.send(err)
                    } else {
                        const user = await getUser(req.email)
                        if (user.err) {
                            res.send(user.err)
                        } else {
                            deleteFile(req.body.imageKey)
                            res.status(200).send({
                                images: user.data.images || []
                            })
                        }
                    }
                }
            )
    } catch (err) {
        res.send(err)
    }
})

router.post("/save", upload.single("image"), async (req, res) => {
    try {
        const imageMax = 3
        const user = await verifyFormDataUserToken(req.body.token)
        if (user.success) {
            const imageQuantity = await getImagesQuantity(user.email)
            if (imageQuantity >= imageMax) {
                res.status(405).json({
                    message: `Not Allowed: Max image quantity is ${imageMax}`
                })
            } else {
                const data = await uploadFile(req.file)
                fs.unlinkSync(req.file.path)
                if (data.err) {
                    res.send(data.err)
                } else {
                    const imageSaved = await addUserImage(user.email, data.key)
                    if (imageSaved.success) {
                        const userData = await getUser(user.email)
                        if (userData.success) {
                            res.status(201).json({
                                message: "Image was saved successfully",
                                images: userData.data.images
                            })
                        } else if (userData.data.err) {
                            res.send(userData.data.err)
                        } else {
                            res.status(404).json({
                                message: "User not found"
                            })
                        }
                    } else if (imageSaved.err) {
                        res.send(imageSaved.err)
                    } else {
                        res.status(400).json({
                            message: "Image was not saved because there are too many images"
                        })
                    }
                }
            }
        } else {
            fs.unlinkSync(req.file.path)
            res.status(403).json({
                message: "Forbidden: Token was bad"
            })
        }
    } catch (err) {
        res.send(err)
    }
})

module.exports = router
