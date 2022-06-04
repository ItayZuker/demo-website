import React, { useEffect } from "react"
import "./characters-counter.scss"

const CharactersCounter = (props) => {
    /* Triggers */
    useEffect(() => {
        if (props.value >= props.typeLimit) {
            props.callBack(true)
        } else {
            props.callBack(false)
        }
    }, [props.value])

    /* JSX Output */
    return (
        <div className={"character-counter-container " + (props.isActive ? "active" : "")}>
            <p className='current-count'>{props.value}</p>
            <p className='separator'>/</p>
            <p className='limit-count'>{props.typeLimit}</p>
        </div>
    )
}

export default CharactersCounter
