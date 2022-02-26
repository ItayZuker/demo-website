const express = require('express');
const app = express();
const Create_User_Rout = require('./routs/create-user.rout');
const Login_Rout = require('./routs/login.rout');
const Profile_Settings_Rout = require('./routs/profile-settings.rout');
require('./db.js');

app.set('json spaces', 2);
app.use(express.json());

app.use('/create-user', Create_User_Rout);
app.use('/login', Login_Rout);
app.use('/profile-settings', Profile_Settings_Rout);

let port = 8080;
if(process.env.PORT) {
    port = process.env.PORT;
}

app.listen(port, () => {
    console.log('server is running on port:' + port);
});