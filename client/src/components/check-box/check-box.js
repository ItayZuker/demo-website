import React, { useState } from "react"
import "./check-box.scss"

const CheckBox = (props) => {
    /* Locale Variables */
    const [check, setCheck] = useState(false)

    /* Functions */
    const clickCheckBox = () => {
        if (check) {
            setCheck(false)
            props.callback(false)
        } else {
            setCheck(true)
            props.callback(true)
        }
    }

    /* JSX Output */
    return (
        <div
            className={"check-box-container " + (check ? "check" : "")}
            onClick={() => clickCheckBox()}>
            <div className='check-box'>
            </div>
            <p className='check-box-text'>{props.text}</p>
        </div>
    )
}

export default CheckBox
