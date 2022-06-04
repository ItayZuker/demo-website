const express = require("express")

const router = express.Router()
const jwt = require("jsonwebtoken")
const generator = require("generate-password")
const bcrypt = require("bcrypt")
const validator = require("email-validator")
const nodemailer = require("nodemailer")
const UserModel = require("../models/user.model")
const TemporaryUserModel = require("../models/TemporaryUser.model")
require("dotenv").config()

/* Router functions */
const getTemporaryPassword = (res) => new Promise((resolve) => {
    const password = generator.generate({
        length: 6,
        numbers: true
    })
    if (password) {
        resolve(password)
    } else {
        res.status(400).json({
            message: "Problem generating password"
        })
    }
})

const getEncryptedPassword = (res, passwordString) => new Promise((resolve) => {
    const saltRounds = 10
    bcrypt.hash(passwordString, saltRounds, (err, hash) => {
        if (err) {
            res.status(400).send(err)
        } else {
            resolve(hash)
        }
    })
})

const getUserToken = (res, data) => new Promise((resolve) => {
    const secretKey = process.env.ACCESS_TOKEN_SECRET

    const user = {
        email: data.email
    }

    const second = 1
    const minute = second * 60
    const hour = minute * 60
    const day = hour * 24
    const lifeTime = day * 30

    const options = {
        expiresIn: lifeTime
    }

    jwt.sign(user, secretKey, options, (err, token) => {
        if (err) {
            res.status(400).send(err)
        } else if (!token) {
            res.status(400).json({
                message: "Something went wrong: Token was not created"
            })
        } else {
            resolve(token)
        }
    })
})

const validateEmail = (res, emailString) => new Promise((resolve) => {
    const validation = validator.validate(emailString)
    if (validation) {
        resolve(true)
    } else {
        res.status(405).json({
            message: "Not Allowed: Email was not validated"
        })
    }
})

const sendPassword = (email, password) => new Promise((resolve) => {
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
        text: `Your password is: ${password}`
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            resolve({ status: false, err })
        } else {
            // eslint-disable-next-line no-console
            console.log(`Email sent: ${info.response}`)
            resolve({ status: true })
        }
    })
})

const checkPassword = (res, emailPassword, encryptedPassword) => new Promise((resolve) => {
    bcrypt.compare(emailPassword, encryptedPassword, (err, result) => {
        if (err) {
            res.status(400).send(err)
        } else {
            resolve(result)
        }
    })
})

const createUser = (res, data) => new Promise((resolve) => {
    /* Create new user item, in permanent app database */
    UserModel
        .create({
            iat: new Date(),
            email: data.email,
            name: "userName",
            images: [],
            about: "",
            gender: "",
            birthday: data.birthday,
            geoData: data.geoData,
            legal: data.legal,
            login: true,
            invitations: [],
            verify: {
                hash: "",
                lifeTime: null,
                timeStamp: null
            }
        }, async (err, user) => {
            if (err) {
                res.status(400).send(err)
            } else if (user) {
                resolve(user)
            } else {
                resolve(false)
            }
        })
})

const validateRegisterData = (res, data) => new Promise((resolve) => {
    if (!data.legal.agree) {
        res.status(405).json({
            message: "Not Allowed: User did not agree to terms"
        })
    } else if (!data.email) {
        res.status(405).json({
            message: "Not Allowed: Email is missing"
        })
    } else {
        resolve()
    }
})

const didHashExpired = (expirationTime) => new Promise((resolve) => {
    const now = new Date().getTime() / 1000
    if (expirationTime > now) {
        resolve(false)
    } else {
        resolve(true)
    }
})

const deleteTemporaryUser = (user) => {
    TemporaryUserModel
        .findOneAndDelete(
            // eslint-disable-next-line no-underscore-dangle
            { _id: user._id },
            {},
            (err) => {
                if (err) {
                    // eslint-disable-next-line no-console
                    console.log(err)
                } else {
                    // eslint-disable-next-line no-console
                    console.log(`Temporary user deleted: ${user.email}`)
                }
            }
        )
}

router.post("/email-verification", async (req, res) => {
    try {
        /* Verify email */
        await validateEmail(res, req.body.email)

        /* Define verification item lifetime in database */
        const second = 1000
        const minute = second * 60
        const lifeTime = minute * 2

        /* Generate new password and encrypted password */
        const password = await getTemporaryPassword(res)
        const hash = await getEncryptedPassword(res, password)

        /* Build a new data item */
        const data = {
            email: req.body.email,
            hash,
            lifeTime,
            timeStamp: new Date().getTime() / 1000,
            verified: false
        }

        /* Find if the email is currently in use by a user */
        const user = await UserModel.findOne({ email: data.email }).exec()
        if (user) {
            res.status(200).json({
                registered: true,
                passwordSent: false,
                message: "This email is already registered",
                passwordLifetime: null,
                passwordSize: null,
                stage: "email"
            })
        } else {
            /* Find if the email is currently in use in temporary DB, and delete if true */
            TemporaryUserModel
                .findOneAndDelete(
                    {
                        email: data.email
                    },
                    {

                    },
                    (err, verificationItem) => {
                        if (err) {
                            res.status(400).send(err)
                        } else if (verificationItem) {
                            // eslint-disable-next-line no-console
                            console.log("Email duplication was found in temporary database, and was deleted")
                        } else {
                            // eslint-disable-next-line no-console
                            console.log("No email duplication was found")
                        }
                    }
                )

            /* Create a new (Temporary) email user in database, with new hash password */
            await TemporaryUserModel
                .create(data, async (err, docs) => {
                    if (err) {
                        res.send(err)
                    } else {
                        const passwordSent = await sendPassword(docs.email, password)
                        if (passwordSent.status) {
                            res.status(200).json({
                                registered: false,
                                passwordSent: true,
                                message: "Password was sent to your email",
                                passwordLifetime: data.lifeTime,
                                passwordSize: password.length,
                                stage: "password"
                            })
                        } else {
                            res.send(passwordSent.err)
                        }
                    }
                })
        }
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post("/password-verification", async (req, res) => {
    try {
        /* Build a new data item */
        const data = {
            email: req.body.email,
            password: req.body.password,
            date: req.body.date
        }

        /* Find item with matching email in (Temporary) database */
        const user = await TemporaryUserModel
            .findOne({ email: data.email }).exec()

        if (user) {
            /* Check register password lifetime */
            const lifeTime = user.lifeTime / 1000
            const { timeStamp } = user
            const expirationTime = timeStamp + lifeTime
            const registerHashExpired = await didHashExpired(expirationTime)

            if (registerHashExpired) {
                deleteTemporaryUser(user)
                res.status(200).json({
                    match: false,
                    expired: true,
                    stage: "password",
                    message: "Password expired"
                })
            } else {
                /* Decrypt password and compare */
                const match = await checkPassword(res, data.password, user.hash)

                if (match) {
                    /* Update temporary user to confirm this email is verified */
                    TemporaryUserModel
                        .findOneAndUpdate({
                            email: data.email
                        }, {
                            verified: true,
                            hash: "",
                            lifeTime: null,
                            timeStamp: null
                        }, {

                        }, (err, docs) => {
                            if (err) {
                                res.send(err)
                            } else {
                                res.status(200).json({
                                    match: true,
                                    email: docs.email,
                                    stage: "create-user",
                                    message: "Email verified"
                                })
                            }
                        })
                } else {
                    res.status(403).json({
                        match: false,
                        email: data.email,
                        stage: "password",
                        message: "Wrong password"
                    })
                }
            }
        } else {
            res.status(404).json({
                match: false,
                email: "",
                stage: "password",
                message: "Email No found"
            })
        }
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post("/submit", async (req, res) => {
    try {
        /* Verify req data */
        await validateRegisterData(res, req.body)

        /* Build a new data item */
        const data = {
            email: req.body.email,
            birthday: req.body.birthday,
            legal: req.body.legal,
            geoData: req.body.geoData
        }

        /* Delete email item from verified email database */
        TemporaryUserModel
            .findOneAndDelete(
                {
                    email: data.email,
                    verified: true
                },
                {

                },
                async (err, docs) => {
                    if (err) {
                        res.status(400).send(err)
                    } else if (docs) {
                        /* Create new user */
                        const token = await getUserToken(res, data)
                        if (token) {
                            const newUser = await createUser(res, data)
                            if (newUser) {
                                res.status(201).json({
                                    token,
                                    message: "New user created"
                                })
                            }
                        } else {
                            res.status(401).json({
                                createUser: false,
                                email: docs.email,
                                stage: "create-user",
                                message: "Something went wrong: User was not created"
                            })
                        }
                    } else {
                        res.status(401).json({
                            createUser: false,
                            email: data.email.string,
                            stage: "create-user",
                            message: "Email was not verified"
                        })
                    }
                }
            )
    } catch (err) {
        res.status(400).send(err)
    }
})

router.delete("/error", async (req, res) => {
    /* Build a new data item */
    const data = {
        email: req.body.email
    }

    /* Delete email item from temporary database */
    const temporaryUser = await TemporaryUserModel
        .findOneAndDelete(
            {
                email: data.email
            }
        ).exec()

    /* Delete user account from database */
    const user = await UserModel
        .findOneAndDelete(
            {
                email: data.email
            }
        ).exec()

    if (!!temporaryUser && !!user) {
        /* console.log("User account was found, and deleted from DB") */
        /* console.log("Temporary User was found, and deleted from temporary DB") */
        res.status(204).send()
    } else if (!temporaryUser && !!user) {
        /* console.log("User account was found, and deleted from DB") */
        /* console.log("Temporary User was not found in temporary DB") */
        res.status(204).send()
    } else if (!!temporaryUser && !user) {
        /* console.log("User account was not found in DB") */
        /* console.log("Temporary User was found, and deleted from temporary DB") */
        res.status(404).json()
    } else {
        /* console.log("User account was not found in DB") */
        /* console.log("Temporary User was not found in temporary DB") */
        res.status(404).send()
    }
})

module.exports = router
