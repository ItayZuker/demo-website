import React, {useContext} from "react";
import {ProfileContext} from "../../../../../../../../../context/profile-context";
import "./contact-support.scss";

const ContactSupport = () => {

    const {
        setTab,
    } = useContext(ProfileContext);

    const goToSupport = () => {
        setTab('help')
    }

    return (
        <div className='contact-support-container'>
            <p>To edit your birthday, Please contact <span className='support-button' onClick={() => goToSupport()}>support</span></p>
        </div>
    )
};

export default ContactSupport;