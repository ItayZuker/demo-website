import React, {useContext} from "react";
import "./zero-invitations.scss";
import {ProfileContext} from "../../../../../../../../../context/profile-context";

const ZeroInvitations = () => {

    /* Global Variables */
    const {
        details,
    } = useContext(ProfileContext);

    if (details.invitations.length > 1) {
        return <></>
    } else {
        return (
            <div className='zero-invitations-container'>
                <h2>You have not created any invitations</h2>
                <p>Click the <b>Chat</b> or <b>Date</b> icon below, to add some invitations.</p>
            </div>
        )
    }
};

export default ZeroInvitations;