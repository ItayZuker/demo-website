const express = require('express');
const router = express.Router();
const User_Model = require('../models/user.model.js');
const Country_Model = require('../models/country.model.js');
const Global_Model = require('../models/global.model');
const jwt = require('jsonwebtoken');
const generator = require('generate-password');
const bcrypt = require('bcrypt');
const validator = require('email-validator');
const nodemailer = require('nodemailer');
require('dotenv').config();

/* Router functions */
const verifyToken = (req, res, next) => {
    const token = req.body.token;
    if (!!token) {
        const secretKey = process.env.ACCESS_TOKEN_SECRET;
        jwt.verify(token, secretKey, {}, (err, decodedUser) => {
            if (err) {
                res.status(500).send(err);
            } else if (decodedUser.email) {
                req.email = decodedUser.email;
                next();
            } else {
                res.status(400).send('Token not good');
            }
        })
    }
};

/* Profile Details Routs */
router.post('/globals', verifyToken, async (req, res) => {
    const type = req.body.type;
    try {
        Global_Model
            .findOne({type: type}, (err, data) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    const payload = {
                        type: data.type,
                        list: data.list
                    }
                    res.status(200).json(payload);
                }
            });
    } catch (err) {
        res.status(500).send(err);
    }
});

router.put('/update-gender', verifyToken, async (req, res) => {
    try {
        User_Model
            .findOneAndUpdate(
                {email: req.email},
                {gender: req.body.gender},
                {},
                (err)=> {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(200).json(
                            {
                                success: true,
                                message: 'Gender updated successfully',
                                gender: req.body.gender,
                            });
                    }});
    } catch (err) {
        res.status(500).send(err);
    }
})

router.put('/update-country', verifyToken, async (req, res) => {
    try {
        User_Model
            .findOneAndUpdate(
                {email: req.email},
                {geoData: req.body.geoData},
                {},
                (err)=> {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(200).json(
                            {
                                success: true,
                                message: 'GeoData updated successfully',
                                geoData: req.body.geoData,
                            });
                    }});
    } catch (err) {
        res.status(500).send(err);
    }
});

// router.put('/update-countries', async (req, res) => {
//     // console.log(123)
//     try {
//         Country_Model
//             .updateMany(
//                 {},
//                 {ageLimit: 18},
//                 {},
//                 (err)=> {
//                     if (err) {
//                         res.status(500).send(err);
//                     } else {
//                         res.status(200).json(
//                             {
//                                 success: true
//                             });
//                     }});
//     } catch (err) {
//         res.status(500).send(err);
//     }
// });

router.put('/update-name', verifyToken, async (req, res) => {
    try {
        User_Model
            .findOneAndUpdate(
                {email: req.email},
                {name: req.body.name},
                {},
                (err)=> {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(200).json(
                            {
                                success: true,
                                message: 'User name updated successfully',
                                name: req.body.name,
                            });
                    }});
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/', verifyToken, async ( req, res) => {
    try {
        User_Model
            .findOne({email: req.email}, (err, user) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    const userDetails = {
                        name: user.name,
                        geoData: user.geoData,
                        email: user.email,
                        birthday: user.birthday,
                        gender: user.gender,
                        invitations: user.invitations,
                    }
                    res.status(200).json(userDetails);
                }
            });
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/get-countries', verifyToken, async ( req, res) => {
    try {
        Country_Model
            .find({}, (err, countries) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).json(countries);
                }
            });
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;