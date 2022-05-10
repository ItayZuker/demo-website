const express = require("express")

const multer = require("multer")

const fs = require("fs")

const upload = multer({ dest: "images/" })
const router = express.Router()
const jwt = require("jsonwebtoken")
const { uploadFile } = require("../s3")
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
                    const user = await getUser(userEmail)
                    console.log(user)
                }
            }
        )
})

/* Profile Details Routs */
router.post("/", verifyToken, (req, res) => {
    try {
        UserModel
            .findOne(
                {},
                {},
                {},
                (err, docs) => {
                    if (err) {
                        res.send(err)
                    } else {
                        console.log(docs)
                    }
                }
            )
    } catch (err) {
        res.send(err)
    }
})

router.post("/save", upload.single("image"), async (req, res) => {
    try {
        const user = await verifyFormDataUserToken(req.body.token)
        if (user.success) {
            // eslint-disable-next-line no-shadow
            const data = await uploadFile(req.file)
            const imageSaved = await addUserImage(user.email, data.key)
            if (imageSaved.success) {
                res.status(201).json({
                    message: "Image was saved successfully"
                })
            } else if (imageSaved.err) {
                res.send(imageSaved.err)
            } else {
                res.status(400).json({
                    message: "Image was not saved because there are too many images"
                })
            }
        } else {
            // delete image from "/images"
            fs.unlinkSync(req.file.path)
            res.status(403).json({
                message: "Forbidden: Token was bad"
            })
        }
    } catch (err) {
        res.send(err)
    }
})

router.post("/", verifyToken, async (req, res) => {
    try {
        UserModel
            .findOne(
                {
                    email: req.email
                },
                {},
                {},
                async (err, docs) => {
                    if (err) {
                        res.send(err)
                    } else {
                        console.log(docs)
                    }
                }
            )
    } catch (err) {
        res.send(err)
    }
})

module.exports = router
