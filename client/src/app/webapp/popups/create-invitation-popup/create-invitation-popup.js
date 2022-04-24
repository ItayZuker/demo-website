import React from "react";
import {CreateInvitationContextComponent} from "../../../../context/create-invitation-context";
import CreateInvitation from "./create-invitation/create-invitation";
import "./create-invitation-popup.scss";

const CreateInvitationPopup = () => {

    /* JSX Output */
    return (
        <div className='create-invitation-popup-container'>
            <CreateInvitationContextComponent>
                <CreateInvitation />
            </CreateInvitationContextComponent>
        </div>
    )
};

export default CreateInvitationPopup;