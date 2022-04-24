import React, {useContext} from "react";
import {GlobalContext} from "../../../../../../../context/global-context";
import "./create-invitation-button.scss";

const CreateInvitationButton = () => {

    const {
        setPopup
    } = useContext(GlobalContext);

    return (
        <div
            onClick={() => setPopup('create-invitation')}
            className='create-invitation-button-container'>
            <div className='icon-container'>
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M70 45.05V10C70 4.48 65.52 0 60 0C54.48 0 50 4.48 50 10V45.05C50 47.78 47.79 50 45.05 50H10C4.48 50 0 54.48 0 60C0 65.52 4.48 70 10 70H45.05C47.78 70 50 72.21 50 74.95V110C50 115.52 54.48 120 60 120C65.52 120 70 115.52 70 110V74.95C70 72.22 72.21 70 74.95 70H110C115.52 70 120 65.52 120 60C120 54.48 115.52 50 110 50H74.95C72.22 50 70 47.79 70 45.05Z" fill="white"/>
                </svg>
            </div>
            <p>Add Invitation</p>
        </div>
    )
};

export default CreateInvitationButton;