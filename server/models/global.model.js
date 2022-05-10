const mongoose = require("mongoose")

const GlobalSchema = mongoose.Schema({
    type: {
        type: String,
        require: true
    },
    list: {
        type: Array,
        require: true
    }
})

const GlobalModel = mongoose.model("global", GlobalSchema)
module.exports = GlobalModel
