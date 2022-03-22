import React, {useContext} from "react";
import {CreateInvitationContext} from "../../../../../../../../../context/add-invitation-context";
import "./new-invitation.scss";

const NewInvitation = () => {

    const {
        setStage,
    } = useContext(CreateInvitationContext);

    const handleClick = () => {
        setStage('type');
    };

    return (
        <div
            onClick={() => handleClick()}
            className='new-invitation-container'>
            <div className='plus-icon'>
            </div>
            <p>Add Invitation</p>
        </div>
    )
};

export default NewInvitation;