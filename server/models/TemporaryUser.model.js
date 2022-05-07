const mongoose = require("mongoose")
const Temporary_User_Schema = mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    verified: {
        type: Boolean,
        require: true,
    },
    hash: {
        type: String,
        require: true,
    },
    lifeTime: {
        type: Number,
        require: true,
    },
    timeStamp: {
        type: Number,
        require: true,
    },
})

const Temporary_User_Model = mongoose.model("temporary-user", Temporary_User_Schema)
module.exports = Temporary_User_Model