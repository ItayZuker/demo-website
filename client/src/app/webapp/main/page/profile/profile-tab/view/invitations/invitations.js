import React, {useEffect, useState, useContext} from "react";
import {GlobalContext} from "../../../../../../../../context/global-context";
import DayList from "./day-list/day-list";
import "./invitations.scss";

const Invitations = () => {

    /* Global Variables */
    const {
        details,
    } = useContext(GlobalContext);

    const [invitations, setInvitations] = useState([])

    useEffect(() => {
        if (details.invitations) {
            updateInvitationsList(details.invitations)
        }
    }, [details.invitations])

    /* Functions */
    const updateInvitationsList = (list) => {
        let week = [
            {list: []},
            {list: []},
            {list: []},
            {list: []},
            {list: []},
            {list: []},
            {list: []},
        ]
        list.forEach((invitation => {
            const date = new Date(invitation.start.timeStamp)
            const day = date.getDay()
            week[day].list.push(invitation)
        }))
        setInvitations(week)
    }

    /* JSX Output */
    if (invitations.length === 0) {
        return <></>
    } else {
        return (
            <div className='invitations-container'>
                {invitations.map((day, index) => {
                    return <DayList day={day} key={index} />
                })}
            </div>
        )
    }
};

export default Invitations;