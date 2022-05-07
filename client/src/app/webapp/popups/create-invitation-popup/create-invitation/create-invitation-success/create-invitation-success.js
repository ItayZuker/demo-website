import React, { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../../../../../context/global-context"
import { CreateInvitationContext } from "../../../../../../context/create-invitation-context"
import Button from "../../../../../../components/button/button"
import "./create-invitation-success.scss"

const CreateInvitationSuccess = () => {
    /* Globale Variables */
    const {
        setPopup
        // socket,
    } = useContext(GlobalContext)

    const {
        setTitle,
        setMessage,
        setStage
    } = useContext(CreateInvitationContext)

    const [anotherInvitation, setAnotherInvitation] = useState(false)
    const [close, setClose] = useState(false)

    useEffect(() => {
        if (close) {
            setPopup("")
        }
    }, [close])

    useEffect(() => {
        if (anotherInvitation) {
            setStage("invitation-start")
        }
    }, [anotherInvitation])

    useEffect(() => {
        updateStageSuccess()
        // socketUpdate()
    }, [])

    // const socketUpdate = () => {
    // socket.emit("invitation-created", {

    // });
    // }

    const updateStageSuccess = () => {
        setTitle("")
        setMessage({
            string: "",
            highlight: false
        })
    }

    return (
        <div className="create-invitation-success-container">
            <div className="title-container">
                <h1>Great!</h1>
                <p>Your chat invitation was created successfully.</p>
            </div>
            <div className="buttons-container">
                <Button
                    isActive={true}
                    loading={false}
                    value={"close"}
                    callback={setClose}/>
                <Button
                    isActive={true}
                    loading={false}
                    value={"Create another chat invitation"}
                    callback={setAnotherInvitation}/>
            </div>
        </div>
    )
}

export default CreateInvitationSuccess
