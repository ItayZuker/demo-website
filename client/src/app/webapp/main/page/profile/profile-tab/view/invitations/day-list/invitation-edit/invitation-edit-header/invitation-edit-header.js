import React from "react"
import InvitationEditHeaderDelete from "./invitation-edit-header-delete/invitation-edit-header-delete"
import InvitationEditHeaderRepeat from "./invitation-edit-header-repeat/invitation-edit-header-repeat"
import "./invitation-edit-header.scss"

const InvitationEditHeader = (props) => {
    /* JSX Output */
    return (
        <div className="invitation-edit-header-container">
            <InvitationEditHeaderRepeat data={props.data} setError={props.setError} />
            <InvitationEditHeaderDelete data={props.data} setClickDelete={props.setClickDelete}/>
        </div>
    )
}

export default InvitationEditHeader
