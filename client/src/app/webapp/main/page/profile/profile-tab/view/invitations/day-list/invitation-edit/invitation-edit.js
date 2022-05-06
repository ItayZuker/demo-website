import React, {useState} from "react";
import InvitationError from "./invitation-error/invitation-error";
import DeleteInvitationConfirmation from "./delete-invitation-confirmation/delete-invitation-confirmation";
import InvitationEditHeader from "./invitation-edit-header/invitation-edit-header";
import InvitationChatBody from "./invitation-chat-body/invitation-chat-body";
import "./invitation-edit.scss";

const InvitationEdit = (props) => {

    const [clickDelete, setClickDelete] = useState(false)
    const [error, setError] = useState(false)

    return (
        <li className="invitation-edit-container">
            {error ? <InvitationError setError={setError}/> : <></>}
            {clickDelete ? <DeleteInvitationConfirmation data={props.data} setClickDelete={setClickDelete} setError={setError}/> : <></>}
            <InvitationEditHeader data={props.data} setClickDelete={setClickDelete} setError={setError}/>
            {props.data.type === "chat" ? <InvitationChatBody data={props.data}/> : <></>}
        </li>
    )
}

export default InvitationEdit;