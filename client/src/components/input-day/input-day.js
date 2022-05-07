import React, { useContext, useEffect, useState } from "react"
import { CreateInvitationContext } from "../../context/create-invitation-context"
import InputCheckBox from "../input-check-box/input-check-box"
import "./input-day.scss"

const InputDay = () => {
    /* Global Variables */
    const {
        daysList,
        monthList,
        setInvitation,
        invitation,
        followingWeek
    } = useContext(CreateInvitationContext)

    /* Locale Variables */
    const [repeat, setRepeat] = useState(false)
    const [dayData, setDayData] = useState("")
    const [monthData, setMonthData] = useState("")

    /* Triggers */
    useEffect(() => {
        updateInvitationRepeat()
    }, [repeat])

    useEffect(() => {
        updateDayData(invitation.start.timeStamp)
        updateMonthData(invitation.start.timeStamp)
    }, [invitation.start])

    /* Functions */
    const updateDayData = (date) => {
        setDayData({
            name: daysList[date.getDay()].name,
            short: daysList[date.getDay()].short,
            metricDayInTheMonth: date.getDate(),
            metricDayInTheWeek: date.getDay() + 1
        })
    }
    const updateMonthData = (date) => {
        setMonthData({
            name: monthList[date.getMonth()].name,
            short: monthList[date.getMonth()].short,
            metricInYear: date.getMonth() + 1
        })
    }

    const updateInvitationRepeat = () => {
        setInvitation(prevState => {
            return {
                ...prevState,
                repeat
            }
        })
    }

    const getNewDayTimeStamp = (data) => {
        const year = data.getFullYear()
        const monthIndex = data.getMonth()
        const day = data.getDate()
        const hours = invitation.start.timeStamp.getHours()
        const minute = invitation.start.timeStamp.getMinutes()
        return new Date(year, monthIndex, day, hours, minute)
    }

    const selectDay = (dayShort) => {
        const day = followingWeek.find(timeStamp => daysList[timeStamp.getDay()].short === dayShort)
        const newDayTimeStamp = getNewDayTimeStamp(day)
        setInvitation(prevState => {
            return {
                ...prevState,
                start: {
                    set: true,
                    timeStamp: newDayTimeStamp
                }
            }
        })
    }

    /* JSX Output */
    return (
        <div className="input-day-container">
            <div className="all-week-container">
                {daysList.map((day, index) => {
                    return (
                        <div
                            onClick={() => selectDay(day.short)}
                            className={"day-item-container " + (dayData.short === day.short ? "selected" : "")}
                            key={index}>
                            <p>{day.short}</p>
                        </div>
                    )
                })}
            </div>
            <div className='selected-date-container'>
                {
                    repeat
                        ? <p><span className="day">Every {dayData.name}</span></p>
                        : <p>
                            <span className="day">{dayData.name}</span>
                            -
                            <span className="month">{monthData.short}</span>
                            <span className="metric-day">{dayData.metricDayInTheMonth}</span>
                        </p>
                }
            </div>
            <div className="repeat-container">
                <InputCheckBox
                    text={"Repeat"}
                    innitial={repeat}
                    callback={setRepeat}/>
            </div>
        </div>
    )
}

export default InputDay
