const mongoose = require("mongoose")

require("dotenv").config()

const dbURL = process.env.MONGODB_ACCESS

mongoose.connect(dbURL, { useNewUrlParser: true })

const db = mongoose.connection
// eslint-disable-next-line no-console
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    // eslint-disable-next-line no-console
    console.log("mongoDb is connected")
})
