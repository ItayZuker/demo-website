import React, {useContext, useEffect, useState} from "react";
import Button from "../../../../../../../../../../../components/button/button";
import "./delete-invitation-confirmation.scss";
import {GlobalContext} from "../../../../../../../../../../../context/global-context";

const DeleteInvitationConfirmation = (props) => {

    /* Global Variables */
    const {
        setDetails
    } = useContext(GlobalContext)

    /* Local Variables */
    const [clickYes, setClickYes] = useState(false)
    const [clickNo, setClickNo] = useState(false)

    /* Triggers */
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
        setDetails(prevState => {
            return {...prevState,
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
            const token = window.localStorage.getItem('token');
            const res = await fetch('/profile-view/delete-invitation', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                    invitationId: props.data.collectionId
                }),
            });
            const data = await res.json();
            handleData(data);
        } catch (err) {
            handleError()
        }
    }

    /* JSX Output */
    return (
        <div className="delete-invitation-confirmation">
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
};

export default DeleteInvitationConfirmation