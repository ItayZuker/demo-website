import React, { useState } from "react"
import InvitationError from "./invitation-error/invitation-error"
import DeleteInvitationConfirmation from "./delete-invitation-confirmation/delete-invitation-confirmation"
import InvitationEditHeader from "./invitation-edit-header/invitation-edit-header"
import InvitationChatBody from "./invitation-chat-body/invitation-chat-body"
import InvitationDateBody from "./invitation-date-body/invitation-date-body"
import "./invitation-edit.scss"

const InvitationEdit = (props) => {
    /* Locale Variables */
    const [clickDelete, setClickDelete] = useState(false)
    const [error, setError] = useState(false)

    /* JSX Output */
    return (
        <li className="invitation-edit-container">
            {error ? <InvitationError setError={setError}/> : <></>}
            {clickDelete ? <DeleteInvitationConfirmation data={props.data} setClickDelete={setClickDelete} setError={setError}/> : <></>}
            <InvitationEditHeader data={props.data} setClickDelete={setClickDelete} setError={setError}/>
            {props.data.type === "chat" ? <InvitationChatBody data={props.data}/> : <></>}
            {props.data.type === "date" ? <InvitationDateBody data={props.data}/> : <></>}
        </li>
    )
}

export default InvitationEdit
