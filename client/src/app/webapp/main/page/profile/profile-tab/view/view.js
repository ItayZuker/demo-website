import React, {useContext} from "react";
import {ProfileContext} from "../../../../../../../context/profile-context";
import AddChatInvitation from "./add-chat-invitation/add-chat-invitation";
import AddDateInvitation from "./add-date-invitation/add-date-invitation";
import "./view.scss";

const View = () => {

    const {
        details
    } = useContext(ProfileContext);

    return (
        <div className='view-container'>
            <AddChatInvitation />
            <AddDateInvitation />
        </div>
    )
};

export default View;