import React, { useState } from "react"
import StageDeleteConfirmation from "./stage-delete-confirmation/stage-delete-confirmation"
import StageDelete from "./stage-delete/stage-delete"
import "./delete-account.scss"

const DeleteAccount = () => {
    /* Locale Variables */
    const [stage, setStage] = useState("confirmation")

    /* JSX Output */
    return (
        <div className="delete-account-container">
            {stage === "confirmation" ? <StageDeleteConfirmation setStage={setStage}/> : <></>}
            {stage === "delete" ? <StageDelete /> : <></>}
        </div>
    )
}

export default DeleteAccount
