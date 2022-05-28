import React from "react"
import "./loading.scss"

const Loading = (props) => {
    /* JSX Output */
    if (!props.loading) {
        return <></>
    } else {
        return (
            <div className="loading-container">
                <div className="lds-default">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }
}

export default Loading
