const express = require("express")

const router = express.Router()
const jwt = require("jsonwebtoken")
// const generator = require("generate-password")
// const bcrypt = require("bcrypt")
// const validator = require("email-validator")
// const nodemailer = require("nodemailer")
const UserModel = require("../models/user.model")
const InvitationModel = require("../models/invitation.model")
const { deleteFile } = require("../s3")
require("dotenv").config()

/* Router Functions */
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

const deleteAllUserInvitations = (userEmail) => {
    InvitationModel
        .deleteMany({ email: userEmail }).exec()
}

const deleteAllUserImages = (userImages) => {
    userImages.forEach((image) => {
        deleteFile(image.originalKey)
        deleteFile(image.smallKey)
        deleteFile(image.mediumKey)
        deleteFile(image.largeKey)
    })
}

/* Profile Settings Routs */
router.delete("/delete-account", verifyToken, async (req, res) => {
    try {
        /* Find user in DB, and delete */
        UserModel
            .findOneAndDelete(
                { email: req.email },
                {},
                async (err, docs) => {
                    if (err) {
                        res.status(400).send(err.message)
                    } else if (docs) {
                        deleteAllUserInvitations(docs.email)
                        deleteAllUserImages(docs.images)
                        res.status(200).json({
                            deleted: true,
                            message: "User deleted"
                        })
                    } else {
                        res.status(204).json({
                            deleted: false,
                            message: "User was not found"
                        })
                    }
                }
            )
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.put("/logout", verifyToken, async (req, res) => {
    try {
        /* Find user in DB, and delete */
        UserModel
            .findOneAndUpdate(
                { email: req.email },
                { login: false },
                {},
                async (err, docs) => {
                    if (err) {
                        res.status(400).send(err.message)
                    } else if (docs) {
                        res.status(200).json({
                            user: true,
                            logout: true,
                            message: "User logged out"
                        })
                    } else {
                        res.status(404).json({
                            user: false,
                            logout: true,
                            message: "User was not found"
                        })
                    }
                }
            )
    } catch (err) {
        res.status(400).send(err.message)
    }
})

module.exports = router
