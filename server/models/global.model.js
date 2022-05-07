const mongoose = require("mongoose")
const Global_Schema = mongoose.Schema({
    type: {
        type: String,
        require: true
    },
    list: {
        type: Array,
        require: true
    }
})

const Global_Model = mongoose.model("global", Global_Schema)
module.exports = Global_Model