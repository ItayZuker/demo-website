import React, { useEffect, useState, useContext } from "react"
import { GlobalContext } from "../../../../../../../../context/global-context"
import DayList from "./day-list/day-list"
import "./invitations.scss"

const Invitations = () => {
    /* Global Variables */
    const {
        details
    } = useContext(GlobalContext)

    const [invitations, setInvitations] = useState([])

    useEffect(() => {
        if (details.invitations) {
            updateInvitationsList(details.invitations)
        }
    }, [details])

    /* Functions */
    const updateInvitationsList = (list) => {
        const week = [
            { index: 0, list: [] },
            { index: 1, list: [] },
            { index: 2, list: [] },
            { index: 3, list: [] },
            { index: 4, list: [] },
            { index: 5, list: [] },
            { index: 6, list: [] }
        ] // lint fix not sure - array to CONST from LET
        list.forEach(invitation => {
            const date = new Date(invitation.start.timeStamp)
            const day = date.getDay()
            week[day].list.push(invitation)
        })
        const sortedWeek = week.sort((a, b) => a.index - b.index)
        const sortedWeekAndDays = sortedWeek.map(dayList => {
            const sortedDayList = dayList.list.sort((a, b) => a.start.timeStamp - b.start.timeStamp)
            return { index: dayList.index, list: sortedDayList }
        })
        setInvitations(sortedWeekAndDays)
    }

    /* JSX Output */
    if (invitations.length === 0) {
        return <></>
    } else {
        return (
            <div className="invitations-container">
                <div className="title-container">
                    <h2>Open invitations:</h2>
                </div>
                {invitations.map((day, index) => {
                    return <DayList day={day} key={index} />
                })}
            </div>
        )
    }
}

export default Invitations
