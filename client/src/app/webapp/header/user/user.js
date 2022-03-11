import React from "react";
import ProfileThumbnailButton from "./profile-thumbnail-button/profile-thumbnail-button";
import './user.scss';

const User = () => {

    return (
        <div className='user-container'>
            <ProfileThumbnailButton />
        </div>
    )
}

export default User;