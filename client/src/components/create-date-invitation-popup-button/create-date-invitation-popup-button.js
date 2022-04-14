import React, {useContext} from "react";
import {GlobalContext} from "../../context/global-context";
import "./create-date-invitation-popup-button.scss";

const CreateDateInvitationPopupButton = () => {

    const {
        setPopup
    } = useContext(GlobalContext);

    return (
        <div
            onClick={() => setPopup('create-date-invitation')}
            className='create-date-invitation-popup-button-container'>
            <p><span className='plus'>{}</span>Date</p>
        </div>
    )
};

export default CreateDateInvitationPopupButton;