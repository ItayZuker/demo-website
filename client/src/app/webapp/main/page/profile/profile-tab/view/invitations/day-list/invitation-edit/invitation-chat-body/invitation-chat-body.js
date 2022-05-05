import React, {useEffect, useState} from "react";
import "./invitation-chat-body.scss";

const InvitationChatBody = (props) => {

    const [start, setStart] = useState("")
    const [duration, setDuration] = useState("")
    const [intro, setIntro] = useState("")

    useEffect(() => {
        getStart()
        getDuration()
        getIntro()
    }, [])

    const getStart = () => {
        const date = new Date(props.data.start.timeStamp)
        const minutes = date.getMinutes()
        const hours = date.getHours()
        setStart(hours + ":" + minutes)
    }

    const getDuration = () => {
        setDuration(props.data.duration.string)
    }

    const getIntro = () => {
        if (props.data.intro) {
            setIntro(props.data.intro)
        } else {
            setIntro("No subject")
        }
    }

    return (
        <div className="invitation-chat-body-container">
            <div className="info-container">
                <div className="inner-info-container">
                    <h2>{props.data.type}</h2>
                    <div className="time-container">
                        <p>{start}<span>|</span>{duration} talk</p>
                    </div>
                </div>
            </div>
            <div className="intro-container">
                <div className="inner-intro-container">
                    <p className="intro"><span className="subject">Subject:</span> {intro}</p>
                </div>
            </div>
        </div>
    )
}

export default InvitationChatBody