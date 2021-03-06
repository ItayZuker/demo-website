const express = require("express")

const router = express.Router()
const jwt = require("jsonwebtoken")
const CountryModel = require("../models/country.model")
const UserModel = require("../models/user.model")
require("dotenv").config()

/* Router functions */
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
                res.status(400).send("Token not good")
            }
        })
    }
}

/* Profile Details Routs */
router.put("/update-about", verifyToken, async (req, res) => {
    try {
        UserModel
            .findOneAndUpdate(
                {
                    email: req.email
                },
                {
                    about: req.body.about
                },
                {
                    new: true
                },
                (err, docs) => {
                    if (err) {
                        res.status(500).send(err)
                    } else {
                        res.status(200).json(
                            {
                                about: docs.about
                            }
                        )
                    }
                }
            )
    } catch (err) {
        res.status(500).send(err)
    }
})

router.put("/update-gender", verifyToken, async (req, res) => {
    try {
        UserModel
            .findOneAndUpdate(
                { email: req.email },
                { gender: req.body.gender },
                {},
                (err) => {
                    if (err) {
                        res.status(500).send(err)
                    } else {
                        res.status(200).json(
                            {
                                success: true,
                                message: "Gender updated successfully",
                                gender: req.body.gender
                            }
                        )
                    }
                }
            )
    } catch (err) {
        res.status(500).send(err)
    }
})

router.put("/update-country", verifyToken, async (req, res) => {
    try {
        UserModel
            .findOneAndUpdate(
                { email: req.email },
                { geoData: req.body.geoData },
                {},
                (err) => {
                    if (err) {
                        res.status(500).send(err)
                    } else {
                        res.status(200).json(
                            {
                                success: true,
                                message: "GeoData updated successfully",
                                geoData: req.body.geoData
                            }
                        )
                    }
                }
            )
    } catch (err) {
        res.status(500).send(err)
    }
})

router.put("/update-name", verifyToken, async (req, res) => {
    try {
        UserModel
            .findOneAndUpdate(
                { email: req.email },
                { name: req.body.name },
                {},
                (err) => {
                    if (err) {
                        res.status(500).send(err)
                    } else {
                        res.status(200).json(
                            {
                                success: true,
                                message: "User name updated successfully",
                                name: req.body.name
                            }
                        )
                    }
                }
            )
    } catch (err) {
        res.status(500).send(err)
    }
})

router.post("/", verifyToken, async (req, res) => {
    try {
        UserModel
            .findOne({ email: req.email }, (err, user) => {
                if (err) {
                    res.send(err)
                } else {
                    const userDetails = {
                        name: user.name,
                        about: user.about,
                        geoData: user.geoData,
                        email: user.email,
                        birthday: user.birthday,
                        gender: user.gender,
                        invitations: user.invitations,
                        images: user.images
                    }
                    res.status(200).json(userDetails)
                }
            })
    } catch (err) {
        res.send(err)
    }
})

router.post("/get-countries", verifyToken, async (req, res) => {
    try {
        CountryModel
            .find({}, (err, countries) => {
                if (err) {
                    res.send(err)
                } else {
                    res.status(200).json(countries)
                }
            })
    } catch (err) {
        res.send(err)
    }
})

module.exports = router
