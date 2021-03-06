import React from "react"
import "./dropdown-item.scss"

const DropdownItem = (props) => {
    /* Functions */
    const getLink = () => {
        const link = props.item.title
        const lowerCase = link.toLowerCase()
        const split = lowerCase.split(" ")
        return "/" + split.join("-")
    }

    /* JSX Output */
    return (
        <div className='dropdown-item-container'>
            <a href={getLink()}>
                <p>{props.item.title}</p>
            </a>
        </div>
    )
}

export default DropdownItem
