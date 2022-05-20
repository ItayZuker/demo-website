import React from "react"
import "./dropdown-menu.scss"

const DropdownMenu = (props) => {
    /* Functions */
    const isActive = (item) => {
        switch (item.title) {
        case "Profile picture":
            return props.imageIndex === 0
        case "Delete":
            return false
        }
    }

    const canBeActivate = (item) => {
        switch (item.title) {
        case "Profile picture":
            return true
        case "Delete":
            return false
        }
    }

    /* JSX Output */
    return (
        <ul className="dropdown-menu-container">
            {props.dropdownList.map((item, index) => {
                return <li
                    onClick={() => props.clickMenuItem(item.title)}
                    className={(canBeActivate(item) ? "can-be-active " : "") + (isActive(item) ? "active" : "")}
                    key={index}>
                    {item.title}
                </li>
            })}
        </ul>
    )
}

export default DropdownMenu
