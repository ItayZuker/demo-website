const express = require('express');
const router = express.Router();
const Temporary_User_Model = require('../models/TemporaryUser.model.js');
const User_Model = require('../models/user.model.js');
const Country_Model = require('../models/country.model');
const jwt = require('jsonwebtoken');
const generator = require('generate-password');
const bcrypt = require('bcrypt');
const validator = require('email-validator');
const nodemailer = require('nodemailer');
require('dotenv').config();

/* Router functions */
const getTemporaryPassword = () => {
    return new Promise((resolve, reject) => {
        const password = generator.generate({
            length: 6,
            numbers: true
        })
        if (password) {
            resolve(password);
        } else {
            reject('Problem generating password');
        }
    });
};

const getEncryptedPassword = (passwordString) => {
    return new Promise((resolve, reject) => {
        const saltRounds = 10;
        bcrypt.hash(passwordString, saltRounds, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
};

const getUserToken = (data) => {
    return new Promise((resolve, reject) => {

        const secretKey = process.env.ACCESS_TOKEN_SECRET;

        const user = {
            email: data.email,
        };

        const second = 1;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const lifeTime = day * 30;

        const options = {
            expiresIn: lifeTime,
        };

        jwt.sign(user, secretKey, options,(err, token) => {
            if(err) {
                reject(err);
            } else if (!token) {
                reject('Something went wrong: Token was not created');
            } else {
                resolve(token);
            }
        });
    });
};

const validateEmail = (emailString) => {
    return new Promise((resolve, reject) => {
        const validation = validator.validate(emailString);
        if (validation) {
            resolve(true);
        } else {
            reject('Problem with email');
        }
    });
};

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
            from: 'mern.app.data@gmail.com',
            to: email,
            subject: 'Email verification',
            text: 'Your password is: ' + password
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
                resolve(false);
            } else {
                console.log('Email sent: ' + info.response);
                resolve(true);
            }
        });
    });
};

const checkPassword = (emailPassword, encryptedPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(emailPassword, encryptedPassword, (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const createUser = (data) => {
    return new Promise(async (resolve, reject) => {

        /* Create new user item, in permanent app database */
        User_Model
            .create({
                iat: new Date(),
                email: data.email,
                name: 'userName',
                gender: '',
                birthday: data.birthday,
                geoData: data.geoData,
                legal: data.legal,
                login: true,
                invitations: [
                    {
                        day: 'sunday',
                        chats: [],
                        events: [],
                    },
                    {
                        day: 'monday',
                        chats: [],
                        events: [],
                    },
                    {
                        day: 'tuesday',
                        chats: [],
                        events: [],
                    },
                    {
                        day: 'wednesday',
                        chats: [],
                        events: [],
                    },
                    {
                        day: 'thursday',
                        chats: [],
                        events: [],
                    },
                    {
                        day: 'friday',
                        chats: [],
                        events: [],
                    },
                    {
                        day: 'saturday',
                        chats: [],
                        events: [],
                    },
                ],
                verify: {
                    hash: '',
                    lifeTime: null,
                    timeStamp: null,
                },

            }, async (err, user) => {
                if (err) {
                    reject(err);
                } else if(!!user){
                    resolve(user);
                } else {
                    resolve(false);
                }
            });
    });
};

const validateRegisterData = (data) => {
    return new Promise((resolve, reject) => {
        if(!data.legal.agree) {
            reject('User did not agree to terms');
        } else if(!data.email) {
            reject('Email is missing');
        } else {
            resolve();
        }
    });
};

const didHashExpired = (expirationTime) => {
    return new Promise(resolve => {
        const now = new Date().getTime() / 1000;
        if(expirationTime > now) {
            resolve(false);
        } else {
            resolve(true);
        }
    });
};

const deleteTemporaryUser = (user) => {
    Temporary_User_Model
        .findOneAndDelete(
            {_id: user._id},
            {},
            (err) => {
                if(err) {
                    console.log(err)
                } else {
                    console.log('Temporary user deleted: ' + user.email);
                }
            });
};

router.post('/email-verification', async ( req, res ) => {
    try {

        /* Verify email */
        await validateEmail(req.body.email);

        /* Define verification item lifetime in database */
        const second = 1000;
        const minute = second * 60;
        const lifeTime = minute * 2;

        /* Generate new password and encrypted password */
        const password = await getTemporaryPassword();
        const hash = await getEncryptedPassword(password);

        /* Build a new data item */
        const data = {
            email: req.body.email,
            hash: hash,
            lifeTime: lifeTime,
            timeStamp: new Date().getTime() / 1000,
            verified: false,
        };

        /* Find if the email is currently in use by a user */
        const user = await User_Model.findOne({email: data.email}).exec();
        if(user) {
            res.status(200).json({
                registered: true,
                passwordSent: false,
                message: 'This email is already registered',
                passwordLifetime: null,
                passwordSize: null,
                stage: 'email'
            });
        } else {

            /* Find if the email is currently in use in temporary database verification collection, and delete if true */
            Temporary_User_Model
                .findOneAndDelete(
                    {
                        email: data.email
                    },
                    {

                    },
                    (err, verificationItem) => {
                        if (err) {
                            res.status(500).send(err);
                        } else if (verificationItem) {
                            console.log('Email duplication was found in temporary database, and was deleted');
                        } else {
                            console.log('No email duplication was found');
                        }
                    });

            /* Create a new (Temporary) email user in database, with new hash password */
            await Temporary_User_Model
                .create(data, async (err, user) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        const passwordSent = await sendPassword(user.email, password);
                        if(passwordSent) {
                            res.status(200).json({
                                registered: false,
                                passwordSent: true,
                                message: 'Password was sent to your email',
                                passwordLifetime: data.lifeTime,
                                passwordSize: password.length,
                                stage: 'password'
                            });
                        } else {
                            res.status(200).json({
                                registered: false,
                                passwordSent: false,
                                message: 'Something went wrong, please try again',
                                passwordLifetime: null,
                                passwordSize: null,
                                stage: 'email'
                            });
                        }
                    }
                });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/password-verification', async ( req, res ) => {
    try {

        /* Build a new data item */
        const data = {
            email: req.body.email,
            password: req.body.password,
            date: req.body.date
        };

        /* Find item with matching email in (Temporary) database */
        const user = await Temporary_User_Model
            .findOne({email: data.email}).exec();

        if(!!user) {

            /* Check register password lifetime */
            const lifeTime = user.lifeTime / 1000;
            const timeStamp = user.timeStamp;
            const expirationTime = timeStamp + lifeTime;
            const registerHashExpired = await didHashExpired(expirationTime);

            if(registerHashExpired) {
                deleteTemporaryUser(user);
                res.status(200).json({
                    match: false,
                    expired: true,
                    stage: 'password',
                    message: 'Password expired',
                });
            } else {

                /* Decrypt password and compare */
                const match = await checkPassword(data.password, user.hash);

                if(match) {

                    /* Update temporary user to confirm this email is verified */
                    Temporary_User_Model
                        .findOneAndUpdate({
                            email: data.email,
                        },{
                            verified: true,
                            hash: '',
                            lifeTime: null,
                            timeStamp: null,
                        },{

                        },(err, user) => {
                            if(err) {
                                res.status(500).send(err);
                            } else {
                                res.status(200).json({
                                    match: true,
                                    email: user.email,
                                    stage: 'create-user',
                                    message: 'Email verified'
                                });
                            }
                        });
                } else {
                    res.status(200).json({
                        match: false,
                        email: data.email,
                        stage: 'password',
                        message: 'Wrong password',
                    });
                }
            }
        } else {
            res.status(200).json({
                match: false,
                email: '',
                stage: 'password',
                message: 'No email in temporary DB',
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/submit', async ( req, res ) => {
    try {

        /* Verify req data */
        await validateRegisterData(req.body);

        /* Build a new data item */
        const data = {
            email: req.body.email,
            birthday: req.body.birthday,
            legal: req.body.legal,
            geoData: req.body.geoData,
        };

        /* Delete email item from verified email database */
        Temporary_User_Model
            .findOneAndDelete(
                {
                    email: data.email,
                    verified: true,
                },
                {

                },
                async (err, user) => {

                if (err) {
                    res.status(500).send(err);
                } else if (!!user) {

                    /* Create new user */
                    const token = await getUserToken(data);
                    if (!!token) {
                        const newUser = await createUser(data);
                        if(!!newUser) {
                            res.status(200).json({
                                token: token,
                                message: 'New user created',
                            });
                        }
                    } else {
                        res.status(200).json({
                            createUser: false,
                            email: user.email,
                            stage: 'create-user',
                            message: 'Something went wrong: User was not created',
                        });
                    }
                } else {
                    res.status(200).json({
                        createUser: false,
                        email: data.email.string,
                        stage: 'create-user',
                        message: 'Email was not verified',
                    });
                }
            });

    } catch (err) {
        res.status(500).send(err);
    }
});

router.delete('/error', async (req, res) => {

    /* Build a new data item */
    const data = {
        email: req.body.email,
    };

    /* Delete email item from temporary database */
    const temporaryUser = await Temporary_User_Model
        .findOneAndDelete(
            {
                email: data.email,
            }).exec();

    /* Delete user account from database */
    const user = await User_Model
        .findOneAndDelete(
            {
                email: data.email,
            }).exec()

    if(!!temporaryUser && !!user) {
        console.log('User account was found, and deleted from DB');
        console.log('Temporary User was found, and deleted from temporary DB');
        res.status(200).json({message: 'Database clean'});
    } else if (!temporaryUser && !!user) {
        console.log('User account was found, and deleted from DB');
        console.log('Temporary User was found, and deleted from temporary DB');
        res.status(200).json({message: 'Database clean'});
    } else if (!!temporaryUser && !user) {
        console.log('User account was not found in DB');
        console.log('Temporary User was found, and deleted from temporary DB');
        res.status(200).json({message: 'Database clean'});
    } else {
        console.log('User account was not found in DB');
        console.log('Temporary User was not found in temporary DB');
        res.status(200).json({message: 'Database clean'});
    }
});

module.exports = router;