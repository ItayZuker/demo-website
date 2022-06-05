import React, { useContext, useState, useEffect } from "react"
import { GlobalContext } from "../../../../../../context/global-context"
import Button from "../../../../../../components/button/button"
import "./stage-delete-confirmation.scss"

const StageDeleteConfirmation = (props) => {
    /* Global Variables */
    const {
        setPopup
    } = useContext(GlobalContext)

    /* Locale Variables */
    const [cancel, setCancel] = useState(false)
    const [deleteAccount, setDeleteAccount] = useState(false)

    /* Triggers */
    useEffect(() => {
        if (cancel) {
            setPopup("")
        }
    }, [cancel])

    useEffect(() => {
        if (deleteAccount) {
            props.setStage("delete")
        }
    }, [deleteAccount])

    /* JSX Output */
    return (
        <div className="stage-delete-confirmation-container">
            <div className="text-container">
                <p>If you delete your account, all your data will be deleted permanently. Are you sure you want to delete?</p>
            </div>
            <div className="buttons-container">
                <Button
                    isActive={true}
                    loading={false}
                    value={"Yes, Delete"}
                    callback={setDeleteAccount}
                    unique={"warning"}/>
                <Button
                    isActive={true}
                    loading={false}
                    value={"Cancel"}
                    callback={setCancel}/>
            </div>
        </div>
    )
}

export default StageDeleteConfirmation
