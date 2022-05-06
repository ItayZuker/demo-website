import React, {useEffect, useState} from "react";
import "./invitation-chat-body.scss";

const InvitationChatBody = (props) => {

    const [start, setStart] = useState("")
    const [duration, setDuration] = useState("")
    const [intro, setIntro] = useState("")

    /* Triggers */
    useEffect(() => {
        getStart()
        getDuration()
        getIntro()
    }, [props.data])

    /* Functions */
    const convertTwoTypes = (value) => {
        let string = String(value)
        if (string.length === 2) {
            return string
        } else {
            string = "0" + string
            return string;
        }
    };

    const getStart = () => {
        const date = new Date(props.data.start.timeStamp)
        const minutes = convertTwoTypes(date.getMinutes())
        const hours = convertTwoTypes(date.getHours())
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

    /* JSX Output */
    return (
        <div className="invitation-chat-body-container">
            <div className="icon-container">
                <svg width="160" height="128" viewBox="0 0 160 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_29_22)">
                        <path d="M42.67 112.56L35.52 110.61C34.01 110.2 32.81 109 32.39 107.48L30.44 100.33C30.39 100.13 30.21 100 30 100C29.79 100 29.62 100.14 29.56 100.33L27.61 107.48C27.2 108.99 26 110.19 24.48 110.61L17.33 112.56C17.13 112.61 17 112.79 17 113C17 113.21 17.14 113.38 17.33 113.44L24.48 115.39C25.99 115.8 27.19 117 27.61 118.52L29.56 125.67C29.67 126.06 30.33 126.06 30.44 125.67L32.39 118.52C32.8 117.01 34 115.81 35.52 115.39L42.67 113.44C42.87 113.39 43 113.21 43 113C43 112.79 42.86 112.62 42.67 112.56V112.56Z" fill="white"/>
                        <path d="M90 50.06V18.04C90 12.5 85.51 8 79.96 8H10.04C4.49 8 0 12.49 0 18.04V62.9C0 68.44 4.49 72.94 10.04 72.94H42.5C43.99 72.94 45.32 73.9 45.79 75.31L49.21 85.57C49.68 86.99 51.01 87.94 52.5 87.94C53.99 87.94 55.32 86.98 55.79 85.57L59.21 75.31C59.68 73.89 61.01 72.94 62.5 72.94H72V68.1C72 58.17 80.07 50.09 90 50.06V50.06ZM25 45.5C22.24 45.5 20 43.26 20 40.5C20 37.74 22.24 35.5 25 35.5C27.76 35.5 30 37.74 30 40.5C30 43.26 27.76 45.5 25 45.5ZM46 45.5C43.24 45.5 41 43.26 41 40.5C41 37.74 43.24 35.5 46 35.5C48.76 35.5 51 37.74 51 40.5C51 43.26 48.76 45.5 46 45.5ZM65 45.5C62.24 45.5 60 43.26 60 40.5C60 37.74 62.24 35.5 65 35.5C67.76 35.5 70 37.74 70 40.5C70 43.26 67.76 45.5 65 45.5Z" fill="white"/>
                        <path d="M149.96 58.0601H90.03C90.03 58.0601 90.01 58.0601 89.99 58.0601C84.46 58.0801 79.99 62.5601 79.99 68.1001V102.96C79.99 108.5 84.48 113 90.03 113H102.49C103.98 113 105.31 113.96 105.78 115.37L109.2 125.63C109.67 127.05 111 128 112.49 128C113.98 128 115.31 127.04 115.78 125.63L119.2 115.37C119.67 113.95 121 113 122.49 113H149.95C155.49 113 159.99 108.51 159.99 102.96V68.1001C159.99 62.5601 155.5 58.0601 149.95 58.0601H149.96ZM100 90.5001C97.24 90.5001 95 88.2601 95 85.5001C95 82.7401 97.24 80.5001 100 80.5001C102.76 80.5001 105 82.7401 105 85.5001C105 88.2601 102.76 90.5001 100 90.5001ZM121 90.5001C118.24 90.5001 116 88.2601 116 85.5001C116 82.7401 118.24 80.5001 121 80.5001C123.76 80.5001 126 82.7401 126 85.5001C126 88.2601 123.76 90.5001 121 90.5001ZM140 90.5001C137.24 90.5001 135 88.2601 135 85.5001C135 82.7401 137.24 80.5001 140 80.5001C142.76 80.5001 145 82.7401 145 85.5001C145 88.2601 142.76 90.5001 140 90.5001Z" fill="white"/>
                        <path d="M118.42 19.22L127.98 21.83C129.77 22.32 131.18 23.73 131.67 25.52L134.28 35.08C134.43 35.62 134.93 36 135.49 36C136.08 36 136.58 35.62 136.73 35.08L139.34 25.52C139.83 23.73 141.24 22.32 143.03 21.83L152.59 19.22C153.13 19.07 153.51 18.57 153.51 18.01C153.51 17.42 153.13 16.92 152.59 16.77L143.03 14.16C141.24 13.67 139.83 12.26 139.34 10.47L136.73 0.90999C136.58 0.36999 136.08 -0.0100098 135.52 -0.0100098C134.93 -0.0100098 134.43 0.36999 134.28 0.90999L131.67 10.47C131.18 12.26 129.77 13.67 127.98 14.16L118.42 16.77C117.88 16.92 117.5 17.42 117.5 17.98C117.5 18.57 117.88 19.07 118.42 19.22V19.22Z" fill="white"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_29_22">
                            <rect width="160" height="128" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
                <div className="info-container">
                    <p>
                        <span className="start">{start}</span>
                        <span className="duration">{duration}</span>
                        <span className="type">{props.data.type}</span>
                    </p>
                </div>
            </div>
            <div className={"intro-container " + (props.data.intro ? "" : "no-content")}>
                <p className="intro">{intro}</p>
            </div>
        </div>
    )
}

export default InvitationChatBody