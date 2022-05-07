const express = require("express")
const router = express.Router()
const User_Model = require("../models/user.model.js")
const jwt = require("jsonwebtoken")
const generator = require("generate-password")
const bcrypt = require("bcrypt")
const validator = require("email-validator")
const nodemailer = require("nodemailer")
require("dotenv").config()

/* Router functions */
const getTemporaryPassword = () => {
    return new Promise((resolve, reject) => {
        const password = generator.generate({
            length: 6,
            numbers: true
        })
        if (password) {
            resolve(password)
        } else {
            reject("Problem generating password")
        }
    })
}

const getEncryptedPassword = (passwordString) => {
    return new Promise((resolve, reject) => {
        const saltRounds = 10;
        bcrypt.hash(passwordString, saltRounds, (err, hash) => {
            if (err) {
                reject(err)
            } else {
                resolve(hash)
            }
        })
    })
}

const getUserToken = (data) => {
    return new Promise((resolve, reject) => {

        const user = {email: data.email}
        const secretKey = process.env.ACCESS_TOKEN_SECRET
        const options = {
            expiresIn: 60 * 60 * 24 * 7
        }

        jwt.sign(user, secretKey, options,(err, token) => {
            if(err) {
                reject(err)
            } else if (!token) {
                reject("Something went wrong: Token was not created")
            } else {
                resolve(token)
            }
        })
    })
}

const validateEmail = (emailString) => {
    return new Promise((resolve, reject) => {
        const validation = validator.validate(emailString)
        if (validation) {
            resolve(true)
        } else {
            reject("Problem with email")
        }
    })
}

const sendPassword = (email, password) => {
    return new Promise((resolve) => {
        const transporter = nodemailer.createTransport({
            service: process.env.NODE_MAILER_SERVICE,
            auth: {
                user: process.env.NODE_MAILER_USER,
                pass: process.env.NODE_MAILER_PASS
            }
        })
        const mailOptions = {
            from: "mern.app.data@gmail.com",
            to: email,
            subject: "Email verification",
            text: "Your password is: " + password
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err)
                resolve(false)
            } else {
                console.log("Email sent: " + info.response)
                resolve(true)
            }
        })
    })
}

const checkPassword = (emailPassword, encryptedPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(emailPassword, encryptedPassword, (err, result) => {
            if(err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

const didHashExpired = (expirationTime) => {
    return new Promise(resolve => {
        const now = new Date().getTime() / 1000
        if(expirationTime > now) {
            resolve(false)
        } else {
            resolve(true)
        }
    })
}

const login = async (user) => {
        const res = await User_Model
            .findOneAndUpdate({
                    _id: user._id,
                },{
                    login: true,
                },{

                }).exec();
        if (res) {
            return {success: true}
        } else {
            return {success: false}
        }
}

/* Login Routs */
router.put("/email-verification", async ( req, res ) => {
    try {

        /* Verify email */
        await validateEmail(req.body.email);

        /* Define lifetime */
        const second = 1000
        const minute = second * 60
        const lifeTime = minute * 2

        /* Generate new password and encrypted password */
        const password = await getTemporaryPassword()
        const hash = await getEncryptedPassword(password)

        /* Build a new data item */
        const data = {
            email: req.body.email,
            hash: hash,
            lifeTime: lifeTime,
            timeStamp: new Date().getTime() / 1000,
        }

        /* Find if user is registered */
        User_Model
            .findOneAndUpdate(
                {
                    email: req.body.email
                }, 
                {
                    verify: {
                        hash: data.hash,
                        lifeTime: data.lifeTime,
                        timeStamp: data.timeStamp,
                    },
                },
                {

                },
                async (err, user) => {
                if (err) {
                    res.status(500).send(err)
                } else if (!!user) {
                    const emailSent = await sendPassword(user.email, password)
                    if(!!emailSent) {
                        res.status(200).json({
                            passwordSent: true,
                            message: "Password was sent to your email",
                            passwordLifetime: data.lifeTime,
                            passwordSize: password.length,
                            stage: "password"
                        })
                    } else {
                        res.status(200).json({
                            passwordSent: false,
                            message: "Something went wrong",
                            stage: "email"
                        })
                    }
                } else {
                    res.status(200).json({
                        passwordSent: false,
                        message: "User was not found",
                        stage: "email"
                    })
                }
            })
    } catch (err) {
        res.status(500).send(err)
    }
})

router.post("/password-verification", async ( req, res ) => {
    try {

        /* Build a new data item */
        const data = {
            email: req.body.email,
            password: req.body.password,
        }

        /* Find user with matching email in database */
        const user = await User_Model
            .findOne({email: data.email}).exec()

        if(!!user) {

            /* Check password lifetime */
            const lifeTime = user.verify.lifeTime / 1000
            const timeStamp = user.verify.timeStamp
            const expirationTime = timeStamp + lifeTime
            const loginHashExpired = await didHashExpired(expirationTime)

            if(loginHashExpired) {
                res.status(200).json({
                    match: false,
                    expired: true,
                    stage: "password",
                    message: "Password expired",
                })
            } else {

                /* Decrypt password and compare */
                const match = await checkPassword(data.password, user.verify.hash)

                if(match) {
                    const token = await getUserToken(user);
                    if(!!token) {
                        const {success} = await login(user);
                        if (success) {
                            res.status(200).json({
                                token: token,
                                message: "Password verified",
                            })
                        } else {
                            res.status(500).json({
                                match: false,
                                expired: false,
                                stage: "password",
                                message: "Something went wrong",
                            })
                        }
                    } else {
                        res.status(200).json({
                            match: false,
                            expired: false,
                            stage: "password",
                            message: "Something went wrong",
                        })
                    }
                } else {
                    res.status(200).json({
                        match: false,
                        expired: false,
                        stage: "password",
                        message: "Wrong password",
                    })
                }
            }
        } else {
            res.status(200).json({
                match: false,
                expired: false,
                message: "User not found",
            })
        }
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router