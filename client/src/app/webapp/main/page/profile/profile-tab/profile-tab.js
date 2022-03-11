import React, {useContext} from "react";
import {ProfileContext} from "../../../../../../context/profile-context";
import Picture from "./picture/picture";
import Details from "./details/details";
import Schedule from "./schedule/schedule";
import Settings from "./settings/settings";
import Help from "./help/help";
import "./profile-tab.scss";

const ProfileTab = () => {

    const {
        tab,
    } = useContext(ProfileContext);

    return (
        <div className='profile-tab-container'>
            {tab === 'picture' ? <Picture/> : <></>}
            {tab === 'details' ? <Details/> : <></>}
            {tab === 'schedule' ? <Schedule/> : <></>}
            {tab === 'settings' ? <Settings/> : <></>}
            {tab === 'help' ? <Help/> : <></>}
        </div>
    )
};

export default ProfileTab;