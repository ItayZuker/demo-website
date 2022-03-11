import React from "react";
import ProfileNavigation from "./profile-navigation/profile-navigation";
import ProfileTab from "./profile-tab/profile-tab";
import "./profile.scss";

const Profile = () => {

    return (
        <div className='profile-container'>
            <ProfileNavigation />
            <ProfileTab />
        </div>
    )
}

export default Profile;