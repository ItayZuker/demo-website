import React, {useContext} from "react";
import {GlobalContext} from "../../../../context/global-context";
import {CreateInvitationContextComponent} from "../../../../context/create-invitation-context";
import CreateInvitation from "./create-invitation/create-invitation";
import "./create-invitation-popup.scss";

const CreateInvitationPopup = () => {

    /* Import Global Variables */
    const {
        popup,
    } = useContext(GlobalContext);

    /* JSX Output */
    if(popup !== 'create-invitation') {
        return <></>
    } else {
        return (
            <div className='create-invitation-popup-container'>
                <CreateInvitationContextComponent>
                    <CreateInvitation />
                </CreateInvitationContextComponent>
            </div>
        )
    }
};

export default CreateInvitationPopup;