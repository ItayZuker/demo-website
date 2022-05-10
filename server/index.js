const express = require("express")

const app = express()
const WebsiteRout = require("./routs/website.rout")
const CreateUserRout = require("./routs/create-user.rout")
const LoginRout = require("./routs/login.rout")
const ProfileViewRout = require("./routs/profile-view.rout")
const ProfileSettingsRout = require("./routs/profile-settings.rout")
const ProfileDetailsRout = require("./routs/profile-details.rout")
const ProfileImagesRout = require("./routs/profile-images.rout")
require("./db")

app.set("json spaces", 2)

app.use(express.json())

app.use("/website", WebsiteRout)
app.use("/create-user", CreateUserRout)
app.use("/login", LoginRout)
app.use("/profile-view", ProfileViewRout)
app.use("/profile-settings", ProfileSettingsRout)
app.use("/profile-details", ProfileDetailsRout)
app.use("/profile-images", ProfileImagesRout)

let port = 8080
if (process.env.PORT) {
    port = process.env.PORT
}

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`server is running on port: ${port}`)
})
