const express = require("express")

const router = express.Router()
const jwt = require("jsonwebtoken")
// const generator = require("generate-password")
// const bcrypt = require("bcrypt")
// const validator = require("email-validator")
// const nodemailer = require("nodemailer")
const UserModel = require("../models/user.model")
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

/* Profile Settings Routs */

router.delete("/delete-account", verifyToken, async (req, res) => {
    try {
        /* Find user in DB, and delete */
        UserModel
            .findOneAndDelete(
                { email: req.email },
                {},
                async (err, user) => {
                    if (err) {
                        res.send(err)
                    } else if (user) {
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
        res.send(err)
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
                        res.send(err)
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
        res.send(err)
    }
})

module.exports = router
