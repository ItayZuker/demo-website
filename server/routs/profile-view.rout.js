const express = require("express")

const router = express.Router()
const jwt = require("jsonwebtoken")
// const generator = require("generate-password")
// const bcrypt = require("bcrypt")
// const validator = require("email-validator")
// const nodemailer = require("nodemailer")
// const { v4: uuidv4 } = require("uuid")
const { ObjectId } = require("mongodb")
// const Global_Model = require("../models/global.model")
// const Country_Model = require("../models/country.model")
const InvitationModel = require("../models/invitation.model")
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
                res.status(403).send({
                    success: false,
                    message: "Forbidden: Token was bad"
                })
            }
        })
    }
}

const getUser = (email) => new Promise((resolve) => {
    UserModel
        .findOne(
            { email },
            {},
            {},
            (err, user) => {
                if (err) {
                    resolve({
                        success: false,
                        user: {},
                        err
                    })
                } else if (user) {
                    resolve({
                        success: true,
                        data: user,
                        err: false
                    })
                } else {
                    resolve({
                        success: false,
                        user: {},
                        err: false
                    })
                }
            }
        )
})

const addInvitationToUser = (invitation, data) => new Promise((resolve) => {
    // eslint-disable-next-line no-underscore-dangle,no-param-reassign
    invitation.collectionId = data._id
    // eslint-disable-next-line no-param-reassign
    invitation.accepted = false
    // eslint-disable-next-line no-param-reassign
    invitation.freeze = false
    UserModel
        .findOneAndUpdate(
            { email: data.email },
            { $push: { invitations: invitation } },
            {},
            async (err, docs) => {
                if (err) {
                    resolve({ err })
                } else if (docs) {
                    const user = await getUser(data.email)
                    resolve({ success: true, array: user.data.invitations })
                } else {
                    resolve({ success: false })
                }
            }
        )
})

const deleteInvitationFromCollection = (id) => new Promise((resolve) => {
    InvitationModel
        .findOneAndDelete(
            { _id: id },
            {},
            (err) => {
                if (err) {
                    resolve({ err })
                } else {
                    resolve(true)
                }
            }
        )
})

/* Profile Details Routs */
router.put("/update-repeat-invitation", verifyToken, async (req, res) => {
    try {
        const id = ObjectId.createFromHexString(req.body.invitationId)
        UserModel
            .findOneAndUpdate(
                {
                    email: req.email,
                    "invitations.collectionId": id
                },
                {
                    $set: { "invitations.$.repeat": req.body.repeat }
                },
                {},
                async (err) => {
                    if (err) {
                        res.send(err)
                    } else {
                        const user = await getUser(req.email)
                        if (user.err) {
                            res.send(user.err)
                        } else {
                            res.status(200).send({
                                success: true,
                                invitations: user.data.invitations,
                                message: `Invitation repeat updated to: ${req.body.repeat}`
                            })
                        }
                    }
                }
            )
    } catch (err) {
        res.send(err)
    }
})

router.delete("/delete-invitation", verifyToken, async (req, res) => {
    try {
        const id = ObjectId.createFromHexString(req.body.invitationId)
        UserModel
            .findOneAndUpdate(
                { email: req.email },
                { $pull: { invitations: { collectionId: id } } },
                {},
                async (err) => {
                    if (err) {
                        res.send(err)
                    } else {
                        const isDeletedFromCollection = await deleteInvitationFromCollection(id)
                        if (isDeletedFromCollection.err) {
                            res.send(isDeletedFromCollection.err)
                        } else {
                            const user = await getUser(req.email)
                            if (user.err) {
                                res.send(user.err)
                            } else {
                                res.status(200).send({
                                    success: true,
                                    deletedFromGlobalCollection: isDeletedFromCollection,
                                    invitations: user.data.invitations,
                                    message: "Invitation was deleted"
                                })
                            }
                        }
                    }
                }
            )
    } catch (err) {
        res.send(err)
    }
})

router.post("/create-invitation", verifyToken, async (req, res) => {
    try {
        InvitationModel
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
            }, async (err, docs) => {
                if (err) {
                    res.send(err)
                } else {
                    const invitationAdded = await addInvitationToUser(req.body.invitation, docs)
                    if (invitationAdded.err) {
                        res.send(invitationAdded.err)
                    } else if (invitationAdded.success) {
                        res.status(201).send({
                            success: true,
                            message: "Invitation created and added successfully",
                            invitations: invitationAdded.array
                        })
                    } else {
                        res.status(417).send({
                            success: false,
                            message: "Execution failed: Invitation was not added to user"
                        })
                    }
                }
            })
    } catch (err) {
        res.send(err)
    }
})

module.exports = router
