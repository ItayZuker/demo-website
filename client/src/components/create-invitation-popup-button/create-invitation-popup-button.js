import React, { useContext } from "react"
import { GlobalContext } from "../../context/global-context"
import "./create-invitation-popup-button.scss"

const CreateInvitationPopupButton = () => {
    /* Global Variables */
    const {
        setPopup
    } = useContext(GlobalContext)

    /* JSX Output */
    return (
        <div
            onClick={() => setPopup("create-invitation")}
            className="create-invitation-popup-button-container">
            <p>Add Invitation</p>
        </div>
    )
}

export default CreateInvitationPopupButton
