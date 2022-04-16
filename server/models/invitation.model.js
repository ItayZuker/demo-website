const mongoose = require('mongoose');
const Invitation_Schema = mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    timeStamp: {
        type: Date,
        require: true
    },
});

const Invitation_Model = mongoose.model('invitation', Invitation_Schema);
module.exports = Invitation_Model;