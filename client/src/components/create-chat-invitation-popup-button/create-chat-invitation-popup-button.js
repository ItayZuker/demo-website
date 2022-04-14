import React, {useContext} from "react";
import {GlobalContext} from "../../context/global-context";
import "./create-chat-invitation-popup-button.scss";

const CreateChatInvitationPopupButton = () => {

    const {
        setPopup
    } = useContext(GlobalContext);

    return (
        <div
            onClick={() => setPopup('create-chat-invitation')}
            className='create-chat-invitation-popup-button-container'>
            <p><span className='plus'>{}</span>Chat</p>
        </div>
    )
};

export default CreateChatInvitationPopupButton;