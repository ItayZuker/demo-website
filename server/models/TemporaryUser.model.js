const mongoose = require("mongoose")

const TemporaryUserSchema = mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    verified: {
        type: Boolean,
        require: true
    },
    hash: {
        type: String,
        require: true
    },
    lifeTime: {
        type: Number,
        require: true
    },
    timeStamp: {
        type: Number,
        require: true
    }
})

const TemporaryUserModel = mongoose.model("temporary-user", TemporaryUserSchema)
module.exports = TemporaryUserModel
