import React, { useContext } from "react"
import { GlobalContext } from "../../../../../../../../../context/global-context"
import "./zero-invitations.scss"

const ZeroInvitations = () => {
    /* Global Variables */
    const {
        setPopup
    } = useContext(GlobalContext)

    return (
        <div className="zero-invitations-container">
            <h2>You have not created any invitations</h2>
            <p><span onClick={() => setPopup("create-invitation")}>Add an invitation</span>, to start interacting with other people.</p>
        </div>
    )
}

export default ZeroInvitations
