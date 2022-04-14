import React, {useContext} from "react";
import {GlobalContext} from "../../../../context/global-context";
import {CreateChatInvitationContextComponent} from "../../../../context/create-chat-invitation-context";
import CreateChatInvitation from "./create-chat-invitation/create-chat-invitation";
import "./create-chat-invitation-popup.scss";

const CreateChatInvitationPopup = () => {

    /* Import Global Variables */
    const {
        popup,
    } = useContext(GlobalContext);

    /* JSX Output */
    if(popup !== 'create-chat-invitation') {
        return <></>
    } else {
        return (
            <div className='create-chat-invitation-popup-container'>
                <CreateChatInvitationContextComponent>
                    <CreateChatInvitation />
                </CreateChatInvitationContextComponent>
            </div>
        )
    }
};

export default CreateChatInvitationPopup;