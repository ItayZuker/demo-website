import React, { useContext, useEffect, useRef, useState } from "react"
import Button from "../../../../../../../../../../../components/button/button"
import { GlobalContext } from "../../../../../../../../../../../context/global-context"
import "./delete-invitation-confirmation.scss"

const DeleteInvitationConfirmation = (props) => {
    /* Global Variables */
    const {
        setUser
    } = useContext(GlobalContext)

    /* Local Variables */
    const [clickYes, setClickYes] = useState(false)
    const [clickNo, setClickNo] = useState(false)
    const deleteInvitationConfirmationRef = useRef()

    /* Triggers */
    useEffect(() => {
        deleteInvitationConfirmationRef.current.focus()
    }, [])

    useEffect(() => {
        if (clickYes) {
            deleteInvitation()
        }
    }, [clickYes])

    useEffect(() => {
        if (clickNo) {
            props.setClickDelete(false)
        }
    }, [clickNo])

    /* Functions */
    const updateInvitations = (data) => {
        setUser(prevState => {
            return {
                ...prevState,
                invitations: data.invitations
            }
        })
    }

    const handleError = () => {
        props.setClickDelete(false)
        props.setError(true)
    }

    const handleData = (data) => {
        if (data.success) {
            props.setClickDelete(false)
            updateInvitations(data)
        } else {
            handleError()
        }
    }

    const deleteInvitation = async () => {
        try {
            const token = window.localStorage.getItem("token")
            const res = await fetch("/profile-view/delete-invitation", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token,
                    invitationId: props.data.collectionId
                })
            })
            const data = await res.json()
            handleData(data)
        } catch (err) {
            handleError()
        }
    }

    const blurComponent = () => {
        setTimeout(() => {
            setClickNo(true)
        }, 100)
    }

    /* JSX Output */
    return (
        <div
            tabIndex={-1}
            onBlur={() => blurComponent()}
            ref={deleteInvitationConfirmationRef}
            className="delete-invitation-confirmation">
            <p>Are you sure you want to delete this invitation?</p>
            <div className="buttons-container">
                <Button
                    unique="yes"
                    callback={setClickYes}
                    loading={false}
                    isActive={true}
                    value="Yes"/>
                <Button
                    unique="no"
                    callback={setClickNo}
                    loading={false}
                    isActive={true}
                    value="No"/>

            </div>
        </div>
    )
}

export default DeleteInvitationConfirmation
