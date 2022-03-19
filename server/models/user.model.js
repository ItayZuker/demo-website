const mongoose = require('mongoose');
const User_Schema = mongoose.Schema({
    login : {
        type: Boolean,
        require: true,
    },
    geoData: {
        type: Object,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    birthday: {
        type: Object,
        require: true,
    },
    gender: {
        type: String,
        require: true,
    },
    invitations: {
        type: Object,
        require: true,
    },
    legal: {
        type: Object,
        require: true,
    },
    iat: {
        type: Date,
        require: true,
    },
    verify: {
        type: Object,
        require: true
    }
});

const User_Model = mongoose.model('User', User_Schema);
module.exports = User_Model;