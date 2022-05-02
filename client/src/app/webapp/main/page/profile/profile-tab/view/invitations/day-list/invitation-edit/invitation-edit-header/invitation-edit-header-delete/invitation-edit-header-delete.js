import React, {useState} from "react";
import "./invitation-edit-header-delete.scss";

const InvitationEditHeaderDelete = (props) => {

    return (
        <div
            onClick={() => props.setClickDelete(true)}
            className="invitation-edit-header-delete-container">
        </div>
    )
}

export default InvitationEditHeaderDelete;