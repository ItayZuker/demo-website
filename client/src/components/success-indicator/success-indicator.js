import React from "react"
import "./success-indicator.scss"

const SuccessIndicator = (props) => {
    /* JSX Output */
    return (
        <div className={"success-indicator-container " + (props.isActive ? "active" : "")}>
        </div>
    )
}

export default SuccessIndicator
