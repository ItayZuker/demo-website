import React, {useContext} from "react";
import {ProfileContext} from "../../../../../../../context/profile-context";
import AddChatInvitation from "./add-chat-invitation/add-chat-invitation";
import AddDateInvitation from "./add-date-invitation/add-date-invitation";
import "./view.scss";
import CreateChatInvitationPopupButton from "../../../../../../../components/create-chat-invitation-popup-button/create-chat-invitation-popup-button";
import CreateDateInvitationPopupButton from "../../../../../../../components/create-date-invitation-popup-button/create-date-invitation-popup-button";
import Invitations from "./invitations/invitations";
import ZeroInvitations from "./invitations/zero-invitations/zero-invitations";

const View = () => {

    const {
        details
    } = useContext(ProfileContext);

    return (
        <div className='view-container'>
            <ZeroInvitations />
            <AddChatInvitation />
            <AddDateInvitation />
            <Invitations />
        </div>
    )
};

export default View;