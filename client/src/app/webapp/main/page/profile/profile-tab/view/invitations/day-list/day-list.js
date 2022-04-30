import React, {useContext, useEffect, useState} from "react";
import "./day-list.scss";
import {ProfileContext} from "../../../../../../../../../context/profile-context";

const DayList = (props) => {

    const {
        monthList,
        daysList
    } = useContext(ProfileContext);

    const [dayData, setDayData] = useState("")
    const [monthData, setMonthData] = useState("");

    useEffect(() => {
        updateTitle()
    }, [props])

    /* Functions */
    const updateTitle = () => {
        if (props.day.list.length > 0) {
            const date = new Date(props.day.list[0].start.timeStamp)
            setDayData({
                name: daysList[date.getDay()].name,
                short: daysList[date.getDay()].short,
                metricDayInTheMonth: date.getDate(),
                metricDayInTheWeek: date.getDay() + 1,
            });
            setMonthData({
                name: monthList[date.getMonth()].name,
                short: monthList[date.getMonth()].short,
                metricInYear: date.getMonth() + 1,
            });
        }
    }


    if (props.day.list.length === 0) {
        return <></>
    } else {
        return (
            <div className="day-list-container">
                <div className='day-title-container'>
                    <p>
                        <span className='day'>{dayData.name}</span>
                        -
                        <span className='month'>{monthData.short}</span>
                        <span className='metric-day'>{dayData.metricDayInTheMonth}</span>
                    </p>
                </div>
            </div>
        )
    }
}

export default DayList