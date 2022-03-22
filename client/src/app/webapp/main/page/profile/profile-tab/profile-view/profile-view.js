import React, {useContext} from "react";
import {ProfileContext} from "../../../../../../../context/profile-context";
import DailyInvitations from "./daily-invitations/daily-invitations";
import AddInvitation from "./add-invitation/add-invitation";
import "./profile-view.scss";

const ProfileView = () => {

    const {
        details
    } = useContext(ProfileContext);

    return (
        <div className='profile-view-container'>
            <AddInvitation />
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