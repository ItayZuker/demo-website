import React, { useState } from "react"
import DropdownMenu from "./dropdown-menu/dropdown-menu"
import "./dropdown-dots.scss"

const DropdownDots = (props) => {
    /* Locale Variables */
    const [active, setActive] = useState(false)

    /* Functions */
    const clickIcon = () => {
        active ? setActive(false) : setActive(true)
    }

    const clickMenuItem = (title) => {
        props.clickMenuItem({
            title,
            imageIndex: props.imageIndex
        })
        setActive(false)
    }

    /* JSX Output */
    return (
        <div
            tabIndex={-1}
            onBlur={() => setActive(false)}
            className={"dropdown-dots-container " + (active ? "active" : "")}>
            <div
                onClick={() => clickIcon()}
                className="icon-container">
                <svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C23.2843 30 30 23.2843 30 15Z" fill="white"/>
                    <path d="M75 15C75 6.71573 68.2843 0 60 0C51.7157 0 45 6.71573 45 15C45 23.2843 51.7157 30 60 30C68.2843 30 75 23.2843 75 15Z" fill="white"/>
                    <path d="M120 15C120 6.71573 113.284 0 105 0C96.7157 0 90 6.71573 90 15C90 23.2843 96.7157 30 105 30C113.284 30 120 23.2843 120 15Z" fill="white"/>
                </svg>
            </div>
            <div className="menu-container">
                {active
                    ? <DropdownMenu dropdownList={props.dropdownList} clickMenuItem={clickMenuItem} imageIndex={props.imageIndex}/>
                    : <></>}
            </div>
        </div>
    )
}

export default DropdownDots
