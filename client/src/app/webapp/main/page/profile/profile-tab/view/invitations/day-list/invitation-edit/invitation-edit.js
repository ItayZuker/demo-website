import React, {useState} from "react";
import DeleteInvitationConfirmation from "./delete-invitation-confirmation/delete-invitation-confirmation";
import InvitationEditHeader from "./invitation-edit-header/invitation-edit-header";
import "./invitation-edit.scss";

const InvitationEdit = (props) => {

    const [clickDelete, setClickDelete] = useState(false)

    return (
        <li className="invitation-edit-container">
            {clickDelete ? <DeleteInvitationConfirmation setClickDelete={setClickDelete}/> : <></>}
            <InvitationEditHeader data={props} setClickDelete={setClickDelete}/>

        </li>
    )
}

export default InvitationEdit;