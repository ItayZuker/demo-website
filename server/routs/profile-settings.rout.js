const express = require('express');
const router = express.Router();
const User_Model = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const generator = require('generate-password');
const bcrypt = require('bcrypt');
const validator = require('email-validator');
const nodemailer = require('nodemailer');
require('dotenv').config();

/* Router functions */

/* Profile Settings Routs */

router.delete('/delete-account', async ( req, res ) => {
    try {

        const token = req.body.token;
        const secretKey = process.env.ACCESS_TOKEN_SECRET;

        jwt.verify(token, secretKey, {}, (err, decodedUser) => {
            if(err) {
                console.log(err);
                res.status(500).send(err);
            } else {

                /* Find user in DB, and delete */
                User_Model
                    .findOneAndDelete(
                        {
                            email: decodedUser.email
                        },
                        {

                        }, async (err, user) => {
                        if (err) {
                            res.status(500).send(err);
                        } else if (!!user) {
                            res.status(200).json({
                                deleted: true,
                                message: 'User deleted',
                            });
                        } else {
                            res.status(200).json({
                                deleted: false,
                                message: 'User was not found',
                            });
                        }
                    });
            }
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

router.put('/logout', async ( req, res ) => {
    try {

        const token = req.body.token;
        const secretKey = process.env.ACCESS_TOKEN_SECRET;

        jwt.verify(token, secretKey, {}, (err, decodedUser) => {
            if(err) {
                console.log(err);
                res.status(500).send(err);
            } else {

                console.log(decodedUser)

                /* Find user in DB, and delete */
                User_Model
                    .findOneAndUpdate(
                        {
                            email: decodedUser.email
                        },
                        {
                            login: false,
                        },
                        {

                        },
                        async (err, user) => {
                            if (err) {
                                res.status(500).send(err);
                            } else {
                                res.status(500).json({
                                    logout: true,
                                    message: 'User logged out'
                                });
                            }
                        });
            }})
    } catch (err) {
        res.status(500).send(err);
    }
});


module.exports = router;