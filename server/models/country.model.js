const mongoose = require("mongoose")

const CountrySchema = mongoose.Schema({
    countryName: {
        type: String,
        require: true
    },
    countryCode: {
        type: String,
        require: true
    },
    ageLimit: {
        type: Number,
        require: true
    }
})

const CountryModel = mongoose.model("country", CountrySchema)
module.exports = CountryModel
