import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../../../../context/global-context";
import {ProfileContext} from "../../../../../../context/profile-context";
import ProfileView from "./profile-view/profile-view";
import Picture from "./picture/picture";
import Details from "./details/details";
import Settings from "./settings/settings";
import Help from "./help/help";
import "./profile-tab.scss";

const ProfileTab = () => {

    /* Global Variables */
    const {
        tab,
    } = useContext(ProfileContext);

    /* JSX Output */
    return (
        <div className='profile-tab-container'>
            {tab === 'profile-view' ? <ProfileView /> : <></>}
            {tab === 'picture' ? <Picture /> : <></>}
            {tab === 'details' ? <Details /> : <></>}
            {tab === 'settings' ? <Settings /> : <></>}
            {tab === 'help' ? <Help /> : <></>}
        </div>
    )
};

export default ProfileTab;