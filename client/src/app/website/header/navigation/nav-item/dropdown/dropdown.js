import React from "react"
import DropdownItem from "./dropdown-item/dropdown-item"
import "./dropdown.scss"

const Dropdown = (props) => {
    /* JSX Output */
    return (
        <div className={"dropdown-container " + (props.hide ? "hide" : "")}>
            {props.subPages.map((subPage, index) => {
                return <DropdownItem
                    key={index}
                    item={subPage}/>
            })}
        </div>
    )
}

export default Dropdown
