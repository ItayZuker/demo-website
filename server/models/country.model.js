const mongoose = require('mongoose');
const Country_Schema = mongoose.Schema({
    countryName: {
        type: String,
        require: true
    },
    countryCode: {
        type: String,
        require: true
    }
});

const Country_Model = mongoose.model('country', Country_Schema);
module.exports = Country_Model;