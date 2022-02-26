import React, {useContext} from "react";
import {ProfileContext} from "../../../../../../../context/profile-context";
import defaultProfilePicture from "../../../../../../../assets/images/default-profile-picture.jpg";
import "./profile-picture.scss";

const ProfilePicture = () => {

    const {
        tab,
        setTab,
    } = useContext(ProfileContext);

    const goToTab = () => {
        setTab('picture');
    };

    return (
        <div className={'profile-picture-container ' + (tab === 'picture' ? 'active' : '')}>
            <div className='image-container'>
                <img src={defaultProfilePicture} alt='profile-picture'/>
            </div>
            <p onClick={() => goToTab()}>Edit</p>
        </div>
    )
}

export default ProfilePicture;