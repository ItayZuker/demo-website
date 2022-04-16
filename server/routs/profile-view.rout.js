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

const getLocalTimeStamp = (date) => {
    if (date.unlimited) {
        return {
            timeSet: false,
        }
    } else {
        const year = date.year.metric;
        const monthIndex = date.month.metricInYear - 1;
        const day = date.day.metricDayInTheMonth;
        const hours = date.time.hour;
        const minutes = date.time.minute;
        return {
            timeSet: true,
            timeZone: date.timeZone,
            timeStamp: new Date(year, monthIndex, day, hours, minutes),
        };
    }
};

const getUTCTimeStamp = (date) => {
    if (date.unlimited) {
        return {
            timeSet: false,
        }
    } else {
        const minutesToAdd = date.timeZone.metricUTCMinuteOffset;
        const year = date.year.metric;
        const monthIndex = date.month.metricInYear - 1;
        const day = date.day.metricDayInTheMonth;
        const hours = date.time.hour;
        const minutes = date.time.minute;
        const currentDate = new Date(year, monthIndex, day, hours, minutes);
        return {
            timeSet: true,
            timeStamp: new Date(currentDate.getTime() + minutesToAdd*60000),
        }
    }
};

const getInvitation = (invitation) => {
    return new Promise((resolve) => {
        if (invitation.type === 'chat') {
            resolve({
                iat: new Date(),
                type: invitation.type,
                intro: invitation.intro,
                duration: invitation.duration,
                repeat: invitation.repeat,
                start: {
                    local: getLocalTimeStamp(invitation.start),
                    utc: getUTCTimeStamp(invitation.start),
                },
                end: {
                    local: getLocalTimeStamp(invitation.end),
                    utc: getUTCTimeStamp(invitation.end),
                }
            })
        } else {

        }
    })
}

const addInvitationToUser = (invitation, data) => {
    return new Promise((resolve) => {
        invitation.id = data._id
        User_Model
            .findOneAndUpdate(
            {email: data.email},
            {"$push": {"invitations": invitation} },
            {},
            (err, user)=> {
                if (err) {
                    console.log(err)
                    resolve(false)
                } else {
                    resolve(true)
                }});
    })
}


/* Profile Details Routs */
router.post('/create-chat-invitation', verifyToken, async (req, res) => {
    try {
        const invitation = await getInvitation(req.body.invitation);
        Invitation_Model
            .create({
                email: req.email,
                timeStamp: invitation.start.utc.timeStamp
            }, async (err, data) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    const invitationAdded = await addInvitationToUser(invitation, data)
                    if (invitationAdded) {
                        res.status(200).send({
                            success: true,
                            message: 'Invitation added successfully',
                        });
                    } else {
                        res.status(500).send({
                            success: true,
                            message: 'Invitation was not added to user',
                        });
                    }
                }
            })
    } catch (err) {
        res.status(500).send(err);
    }
});



module.exports = router;