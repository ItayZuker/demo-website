const mongoose = require("mongoose")

const InvitationSchema = mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    invitation: {
        type: Object,
        require: true
    },
    iat: {
        type: Date,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    start: {
        type: Object,
        require: true
    },
    end: {
        type: Object,
        require: true
    }
})

const InvitationModel = mongoose.model("invitation", InvitationSchema)
module.exports = InvitationModel
