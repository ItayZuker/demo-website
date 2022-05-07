import React, { useContext } from "react"
import { GlobalContext } from "../../context/global-context"
import "./create-user-popup-button.scss"

const CreateUserPopupButton = () => {
    /* Global Variables */
    const {
        setPopup
    } = useContext(GlobalContext)

    /* JSX Output */
    return (
        <div
            className="create-user-popup-button-container"
            onClick={() => setPopup("create-user")}>
            <p>Create User</p>
        </div>
    )
}

export default CreateUserPopupButton
