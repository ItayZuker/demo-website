import React, { useContext } from "react"
import { GlobalContext } from "../../../../../../../context/global-context"
import Invitations from "./invitations/invitations"
import ZeroInvitations from "./invitations/zero-invitations/zero-invitations"
import EditAbout from "./edit-about/edit-about"
import "./view.scss"

const View = () => {
    /* Global Variables */
    const {
        user
    } = useContext(GlobalContext)

    return (
        <div className="view-container">
            <EditAbout />
            {user.invitations.length > 0
                ? <Invitations />
                : <ZeroInvitations />}
        </div>
    )
}

export default View
