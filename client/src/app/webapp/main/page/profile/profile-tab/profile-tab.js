import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../../../../context/global-context";
import {ProfileContext} from "../../../../../../context/profile-context";
import Picture from "./picture/picture";
import Details from "./details/details";
import Invitations from "./invitations/invitations";
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
            {tab === 'picture' ? <Picture/> : <></>}
            {tab === 'details' ? <Details/> : <></>}
            {tab === 'invitations' ? <Invitations/> : <></>}
            {tab === 'settings' ? <Settings/> : <></>}
            {tab === 'help' ? <Help/> : <></>}
        </div>
    )
};

export default ProfileTab;