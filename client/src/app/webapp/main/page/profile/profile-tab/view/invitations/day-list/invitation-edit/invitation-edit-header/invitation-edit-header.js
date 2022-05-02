import React from "react";
import InvitationEditHeaderDelete from "./invitation-edit-header-delete/invitation-edit-header-delete"
import "./invitation-edit-header.scss";

const InvitationEditHeader = (props) => {

    return (
        <div className="invitation-edit-header-container">
            <InvitationEditHeaderDelete data={props} setClickDelete={props.setClickDelete}/>
        </div>
    )
}

export default InvitationEditHeader;