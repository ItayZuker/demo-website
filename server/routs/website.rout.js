const express = require("express")
const router = express.Router()
const User_Model = require("../models/user.model.js")
const Country_Model = require("../models/country.model.js")
const jwt = require("jsonwebtoken")
const generator = require("generate-password")
const bcrypt = require("bcrypt")
const validator = require("email-validator")
const nodemailer = require("nodemailer")
require("dotenv").config()

/* Website Routs */
router.post("/get-country-data", async ( req, res) => {
    console.log(req.body)
    try {
        Country_Model
            .findOne(
                {countryName: req.body.countryName},
                (err, country) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        const data = {
                            countryName: country.countryName,
                            countryCode: country.countryCode,
                            ageLimit: country.ageLimit,
                        }
                        res.status(200).json(data)
                    }
                })
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router