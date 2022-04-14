import React, {useContext} from "react";
import {ProfileContext} from "../../../../../../../context/profile-context";
import AddChatInvitation from "./add-chat-invitation/add-chat-invitation";
import AddDateInvitation from "./add-date-invitation/add-date-invitation";
import "./profile-view.scss";

const ProfileView = () => {

    const {
        details
    } = useContext(ProfileContext);

    return (
        <div className='profile-view-container'>
            <AddChatInvitation />
            <AddDateInvitation />
            <div className='daily-invitations-container'>
                {/*{details.invitations.map((day, index )=> {*/}
                {/*    const chats = day.chats.length;*/}
                {/*    const events = day.events.length*/}
                {/*    if (chats || events) {*/}
                {/*        return <DailyInvitations*/}
                {/*            key={index}*/}
                {/*            data={day}/>*/}
                {/*    }*/}
                {/*})}*/}
            </div>
        </div>
    )
};

export default ProfileView;