const express = require('express');
const app = express();
const Website_Rout = require('./routs/website.rout.js');
const Create_User_Rout = require('./routs/create-user.rout');
const Login_Rout = require('./routs/login.rout');
const Profile_View_Rout = require('./routs/profile-view.rout');
const Profile_Settings_Rout = require('./routs/profile-settings.rout');
const Profile_Details_Rout = require('./routs/profile-details.rout');
require('./db.js');

app.set('json spaces', 2);
app.use(express.json());


app.use('/website', Website_Rout);
app.use('/create-user', Create_User_Rout);
app.use('/login', Login_Rout);
app.use('/profile-view', Profile_View_Rout);
app.use('/profile-settings', Profile_Settings_Rout);
app.use('/profile-details', Profile_Details_Rout);

let port = 8080;
if(process.env.PORT) {
    port = process.env.PORT;
}

app.listen(port, () => {
    console.log('server is running on port:' + port);
});