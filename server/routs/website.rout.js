const express = require("express")

const router = express.Router()
// const jwt = require("jsonwebtoken")
// const generator = require("generate-password")
// const bcrypt = require("bcrypt")
// const validator = require("email-validator")
// const nodemailer = require("nodemailer")
const CountryModel = require("../models/country.model")
// const User_Model = require("../models/user.model")
require("dotenv").config()

/* Website Routs */
router.post("/get-country-data", async (req, res) => {
    try {
        CountryModel
            .findOne(
                { countryName: req.body.countryName },
                (err, country) => {
                    if (err) {
                        res.send(err)
                    } else {
                        const data = {
                            countryName: country.countryName,
                            countryCode: country.countryCode,
                            ageLimit: country.ageLimit
                        }
                        res.status(200).json(data)
                    }
                }
            )
    } catch (err) {
        res.send(err)
    }
})

module.exports = router
