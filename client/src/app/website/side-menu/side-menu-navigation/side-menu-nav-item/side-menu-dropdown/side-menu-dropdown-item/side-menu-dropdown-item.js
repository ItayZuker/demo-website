import React from "react"
import "./side-menu-dropdown-item.scss"

const SideMenuDropdownItem = (props) => {
    /* Functions */
    const getLink = () => {
        const link = props.item.title
        const lowerCase = link.toLowerCase()
        const split = lowerCase.split(" ")
        return "/" + split.join("-")
    }

    /* JSX Output */
    return (
        <div className="side-menu-dropdown-item-container">
            <a href={getLink()}>{props.item.title}</a>
        </div>
    )
}

export default SideMenuDropdownItem
