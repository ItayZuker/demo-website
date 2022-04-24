import React, {useEffect, useState, useContext} from "react";
import {GlobalContext} from "../../../../../../../../context/global-context";
import "./invitations.scss";

const Invitations = () => {

    /* Global Variables */
    const {
        details,
    } = useContext(GlobalContext);

    const [invitations, setInvitations] = useState(details.invitations || [])

    useEffect(() => {
        if (invitations.length > 0) {
            sortInvitations()
        } else {

        }
    }, [invitations])

    useEffect(() => {
        setInvitations(details.invitations)
    }, [details.invitations])

    /* Functions */
    const sortInvitations = async () => {
        const chatInvitations = await invitations.filter(invitation => invitation.type === "chat")
        const dateInvitations = await invitations.filter(invitation => invitation.type === "date")
        console.log(chatInvitations)
        console.log(dateInvitations)
    }

    /* JSX Output */
    if (invitations.length === 0) {
        return <></>
    } else {
        return (
            <div className='invitations-container'>

            </div>
        )
    }
};

export default Invitations;