const express = require("express")

const router = express.Router()
const jwt = require("jsonwebtoken")
const GlobalModel = require("../models/global.model")
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

/* Global Routs */
router.post("/data", verifyToken, async (req, res) => {
    try {
        GlobalModel
            .find({}, (err, docs) => {
                if (err) {
                    res.status(500).send(err)
                } else {
                    const payload = docs.map((item) => ({
                        type: item.type,
                        data: item.data
                    }))
                    res.status(200).json(payload)
                }
            })
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router
