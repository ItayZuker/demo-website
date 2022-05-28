import React from "react"
import "./loading-dot.scss"

const LoadingDot = (props) => {
    /* JSX Output */
    if (!props.loading) {
        return <></>
    } else {
        return (
            <div className="loading-dot-container">
                <div className="dot"></div>
            </div>
        )
    }
}

export default LoadingDot
