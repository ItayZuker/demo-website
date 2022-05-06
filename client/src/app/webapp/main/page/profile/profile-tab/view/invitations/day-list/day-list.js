import React, {useContext, useEffect, useState} from "react";
import {ProfileContext} from "../../../../../../../../../context/profile-context";
import InvitationEdit from "./invitation-edit/invitation-edit";
import "./day-list.scss";

const DayList = (props) => {

    const {
        monthList,
        daysList
    } = useContext(ProfileContext);

    const [dayData, setDayData] = useState("")
    const [monthData, setMonthData] = useState("")
    const [dayReference, setDayReference] = useState("")

    useEffect(() => {
        updateTitle()
    }, [props])

    /* Functions */
    const getDayReference = (date) => {
        const invitationDay = date.getDay()
        const today = new Date().getDay()
        if (invitationDay === today) {
            return "(Today)"
        } else if (invitationDay - today === 1) {
            return "(Tomorrow)"
        } else {
            return ""
        }
    }

    const updateTitle = () => {
        if (props.day.list.length > 0) {
            const date = new Date(props.day.list[0].start.timeStamp)
            setDayReference(getDayReference(date))
            setDayData({
                name: daysList[date.getDay()].name,
                short: daysList[date.getDay()].short,
                metricDayInTheMonth: date.getDate(),
                metricDayInTheWeek: date.getDay() + 1,
            })
            setMonthData({
                name: monthList[date.getMonth()].name,
                short: monthList[date.getMonth()].short,
                metricInYear: date.getMonth() + 1,
            })
        }
    }

    if (props.day.list.length === 0) {
        return <></>
    } else {
        return (
            <div className="day-list-container">
                <div className="title-container">
                    <p>
                        <span className="day">{dayData.name}</span>
                        -
                        <span className="month">{monthData.short}</span>
                        <span className="metric-day">{dayData.metricDayInTheMonth}</span>
                    </p>
                    <p className="day-reference">
                        {dayReference}
                    </p>
                </div>
                <ul className="list-container">
                    {props.day.list.map((invitation, index) => {
                        return <InvitationEdit data={invitation} key={index}/>
                    })}
                </ul>
            </div>
        )
    }
}

export default DayList