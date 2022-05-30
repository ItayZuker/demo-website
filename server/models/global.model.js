const mongoose = require("mongoose")

const GlobalSchema = mongoose.Schema({
    type: {
        type: String,
        require: true
    },
    data: {
        type: Object,
        require: true
    }
})

const GlobalModel = mongoose.model("global", GlobalSchema)
module.exports = GlobalModel
