const mongoose = require('mongoose');
const Invitation_Schema = mongoose.Schema({
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
    repeat: {
        type: Boolean,
        require: false
    },
    start: {
        type: Object,
        require: true,
    },
    end: {
        type: Object,
        require: true
    }
});

const Invitation_Model = mongoose.model('invitation', Invitation_Schema);
module.exports = Invitation_Model;