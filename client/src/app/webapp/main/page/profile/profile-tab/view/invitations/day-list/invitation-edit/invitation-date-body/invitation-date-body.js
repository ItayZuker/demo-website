import React, { useEffect, useState } from "react"
import CheckBox from "../../../../../../../../../../../components/check-box/check-box"
import "./invitation-date-body.scss"

const InvitationDateBody = (props) => {
    /* Locale Variables */
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
            return string
        }
    }

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
            if (props.data.intro.trim().length > 0) {
                setIntro(props.data.intro)
            } else {
                setIntro("No details")
            }
        } else {
            setIntro("No details")
        }
    }

    /* JSX Output */
    return (
        <div className="invitation-date-body-container">
            <div className="icon-container">
                <svg width="146" height="139" viewBox="0 0 146 139" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_25_6)">
                        <path d="M115.07 89.29L81.81 80.42C80 79.94 78.57 78.51 78.09 76.7L69.22 43.44C69.07 42.89 68.58 42.51 68.01 42.51C67.44 42.51 66.94 42.89 66.8 43.44L57.93 76.7C57.45 78.51 56.02 79.94 54.21 80.42L20.95 89.29C20.4 89.44 20.02 89.93 20.02 90.5C20.02 91.07 20.4 91.57 20.95 91.71L54.21 100.58C56.02 101.06 57.45 102.49 57.93 104.3L66.8 137.56C66.95 138.11 67.44 138.49 68.01 138.49C68.58 138.49 69.08 138.11 69.22 137.56L78.09 104.3C78.57 102.49 80 101.06 81.81 100.58L115.07 91.71C115.62 91.56 116 91.07 116 90.5C116 89.93 115.62 89.43 115.07 89.29V89.29Z" fill="white"/>
                        <path d="M25.52 39.33L35.08 36.72C35.62 36.57 36 36.07 36 35.51C36 34.92 35.62 34.42 35.08 34.27L25.52 31.66C23.73 31.17 22.32 29.76 21.83 27.97L19.22 18.41C19.07 17.87 18.57 17.49 18.01 17.49C17.42 17.49 16.92 17.87 16.77 18.41L14.16 27.97C13.67 29.76 12.26 31.17 10.47 31.66L0.92 34.28C0.38 34.43 0 34.93 0 35.49C0 36.08 0.38 36.58 0.92 36.73L10.48 39.34C12.27 39.83 13.68 41.24 14.17 43.03L16.78 52.59C16.93 53.13 17.43 53.51 17.99 53.51C18.58 53.51 19.08 53.13 19.23 52.59L21.84 43.03C22.33 41.24 23.74 39.83 25.53 39.34L25.52 39.33Z" fill="white"/>
                        <path d="M145.1 26.73L127.89 21.67C126.17 21.16 124.84 19.83 124.33 18.11L119.27 0.9C119.11 0.37 118.62 0 118.07 0H117.94C117.39 0 116.89 0.37 116.74 0.9L111.68 18.11C111.17 19.83 109.84 21.16 108.12 21.67L90.91 26.73C90.38 26.89 90.01 27.38 90.01 27.93V28.06C90.01 28.61 90.38 29.11 90.91 29.26L108.12 34.32C109.84 34.83 111.17 36.16 111.68 37.88L116.74 55.09C116.9 55.62 117.39 55.99 117.94 55.99H118.07C118.62 55.99 119.12 55.62 119.27 55.09L124.33 37.88C124.84 36.16 126.17 34.83 127.89 34.32L145.1 29.26C145.63 29.1 146 28.61 146 28.06V27.93C146 27.38 145.63 26.88 145.1 26.73V26.73Z" fill="white"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_25_6">
                            <rect width="146" height="138.5" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
                <div className="info-container">
                    <div className="time-container">
                        <p>
                            <span className="start">{start}</span>
                            <span className="duration">{duration}</span>
                            <span className="type">{props.data.type}</span>
                        </p>
                    </div>
                    <div className="day-container">
                        <CheckBox
                            text="Repeat"/>
                    </div>
                </div>
            </div>
            <div className={"intro-container " + (props.data.intro ? "" : "no-content")}>
                <p className="intro">{intro}</p>
            </div>
        </div>
    )
}

export default InvitationDateBody
