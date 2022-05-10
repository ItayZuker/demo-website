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
    const getFollowingWeekFromToday = (arr, start, total) => {
        const followingWeek = []
        const followingWeekIndex = []
        for (let i = 0; i < total; i++) {
            if (start + i >= total) {
                followingWeekIndex.push((i + start) - total)
            } else {
                followingWeekIndex.push(start + i)
            }
        }
        followingWeekIndex.forEach(item => {
            const day = arr.find(arrItem => arrItem.index === item)
            followingWeek.push(day)
        })
        return followingWeek
    }
    const getTodayNextWeek = () => {
        const date = new Date()
        date.setDate(date.getDate() + 7)
        return date.getDate()
    }
    const updateInvitationsList = async (list) => {
        const week = [
            { index: 0, list: [] },
            { index: 1, list: [] },
            { index: 2, list: [] },
            { index: 3, list: [] },
            { index: 4, list: [] },
            { index: 5, list: [] },
            { index: 6, list: [] },
            { index: 7, list: [] }
        ] // lint fix not sure - array to CONST from LET
        list.forEach(invitation => {
            const date = new Date(invitation.start.timeStamp)
            const day = date.getDay()
            const nextWeekDate = getTodayNextWeek()
            const invitationDate = date.getDate()
            if (invitationDate === nextWeekDate) {
                week[week.length - 1].list.push(invitation)
            } else {
                week[day].list.push(invitation)
            }
        })
        const today = new Date().getDay()
        const followingWeek = getFollowingWeekFromToday(week, today, week.length)
        const sortedWeekAndDays = followingWeek.map(dayList => {
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
