const express = require('express');
const router = express.Router();
const User_Model = require('../models/user.model');
const Invitation_Model = require('../models/invitation.model');
const Country_Model = require('../models/country.model');
const Global_Model = require('../models/global.model');
const jwt = require('jsonwebtoken');
const generator = require('generate-password');
const bcrypt = require('bcrypt');
const validator = require('email-validator');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
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

const getUTCTimeStamp = (date, timeZoneOffset) => {
    if (!!date.unlimited) {
        return {
            timeSet: false,
        }
    } else {

        // console.log(1)
        // console.log(date.timeStamp)
        // console.log(typeof date.timeStamp)
        // console.log(2)
        // console.log(date.timeStamp.getTime())
        // console.log(3)
        // console.log(new Date(date.timeStamp))
        // console.log(4)
        // console.log(new Date(date.timeStamp).getTime())
        // console.log(5)
        // console.log(new Date(date.timeStamp).getTime() + timeZoneOffset*60000)
        // console.log(6)
        // console.log(new Date(new Date(date.timeStamp).getTime() + timeZoneOffset*60000))
        // console.log(7)
        // console.log((date.timeStamp).getTime() + timeZoneOffset*60000)

        return {
            timeSet: true,
            timeStamp: new Date(date.timeStamp.getTime() + (timeZoneOffset*60000)),
        }
    }
};

const getInvitation = (invitation, timeZone) => {
    console.log('------------------------')
    console.log(invitation)
    // console.log(typeof invitation.start.timeStamp)
    // console.log(invitation.end.timeStamp)
    // console.log(typeof invitation.end.timeStamp)
    return new Promise((resolve) => {
        if (invitation.type === 'chat') {
            resolve({
                iat: new Date(),
                type: invitation.type,
                intro: invitation.intro,
                duration: invitation.duration,
                repeat: invitation.repeat,
                timeZone: invitation.timeZone,
                start: {
                    local: invitation.start.timeStamp,
                    utc: getUTCTimeStamp(invitation.start, timeZone.offset),
                },
                end: {
                    local: invitation.end.timeStamp,
                    utc: getUTCTimeStamp(invitation.end, timeZone.Offset),
                }
            })
        } else {

        }
    })
}

const addInvitationToUser = (invitation, data) => {
    return new Promise((resolve) => {
        invitation.collectionId = data._id
        invitation.accepted = false
        invitation.freeze = false
        User_Model
            .findOneAndUpdate(
            {email: data.email},
            {"$push": {"invitations": invitation} },
            {},
            (err, user)=> {
                if (err) {
                    resolve({status: false})
                } else {
                    let array = []
                    user.invitations.forEach(invitation => array.push(invitation))
                    array.push(invitation)
                    resolve({status: true, array: array})
                }});
    })
}

const getInvitationForCollection = (invitation) => {
    return {
        iat: new Date(),
        type: invitation.type,
        repeat: invitation.repeat,
        start: {
            timeStamp: invitation.start.timeStamp
        },
        end: {
            unlimited: invitation.end.unlimited,
            timeStamp: invitation.end.timeStamp
        }
    }
}

/* Profile Details Routs */
router.post('/create-chat-invitation', verifyToken, async (req, res) => {
    try {
        Invitation_Model
            .create({
                email: req.email,
                iat: new Date(),
                type: req.body.invitation.type,
                start: {
                    timeStamp: req.body.invitation.start.timeStamp
                },
                end: {
                    unlimited: req.body.invitation.end.unlimited,
                    timeStamp: req.body.invitation.end.timeStamp
                }
            }, async (err, data) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    const invitationAdded = await addInvitationToUser(req.body.invitation, data)
                    if (invitationAdded.status) {
                        res.status(200).send({
                            success: true,
                            message: 'Invitation added successfully',
                            invitations: invitationAdded.array,
                        });
                    } else {
                        res.status(500).send({
                            success: true,
                            message: 'Invitation was not added to user'
                        });
                    }
                }
            })
    } catch (err) {
        res.status(500).send(err);
    }
});



module.exports = router;