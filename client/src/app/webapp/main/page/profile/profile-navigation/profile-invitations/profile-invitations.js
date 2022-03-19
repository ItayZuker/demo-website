import React, {useContext} from "react";
import {ProfileContext} from "../../../../../../../context/profile-context";
import InvitationDayTab from "./invitation-day-tab/invitation-day-tab";
import "./profile-invitations.scss";

const ProfileInvitations = () => {

    const {
        details
    } = useContext(ProfileContext);

    return (
        <div className='profile-invitations-container'>
            <p>Invitations</p>
            {details.invitations.map((day, index )=> {
                return <InvitationDayTab
                    key={index}
                    data={day}/>
            })}
        </div>
    )
};

export default ProfileInvitations;