import React, { useContext, useEffect, useRef } from "react"
import { GlobalContext } from "../../../../../../context/global-context"
import SideMenuDropdownItem from "./side-menu-dropdown-item/side-menu-dropdown-item"
import "./side-menu-dropdown.scss"

const SideMenuDropdown = (props) => {
    /* Global Variables */
    const {
        sideMenuDropdown
    } = useContext(GlobalContext)

    const sideMenuDropdownRef = useRef()

    /* Triggers */
    useEffect(() => {
        updateDropdownMaxHeight()
    }, [sideMenuDropdown])

    /* Functions */
    const updateDropdownMaxHeight = async () => {
        if (sideMenuDropdown === props.page) {
            const maxHeight = await getMaxHeight()
            sideMenuDropdownRef.current.style.maxHeight = maxHeight + "px"
        } else {
            sideMenuDropdownRef.current.style.maxHeight = "0px"
        }
    }

    const getMaxHeight = () => {
        return new Promise(resolve => {
            const dropdownContainer = sideMenuDropdownRef.current.children
            const children = dropdownContainer.length
            const height = dropdownContainer[0].clientHeight
            resolve(children * height)
        })
    }

    /* JSX Output */
    return (
        <div
            className="side-menu-dropdown-container"
            ref={sideMenuDropdownRef}>
            {props.subPages.map((subPage, index) => {
                return <SideMenuDropdownItem
                    key={index}
                    item={subPage}/>
            })}
        </div>
    )
}

export default SideMenuDropdown
