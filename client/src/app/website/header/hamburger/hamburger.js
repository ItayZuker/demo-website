import React, { useContext } from "react"
import { GlobalContext } from "../../../../context/global-context"
import menuIcon from "../../../../assets/images/menu-icon.svg"
import "./hamburger.scss"

const Hamburger = () => {
    /* Global variables */
    const {
        sideMenuOpen,
        setSideMenuOpen,
        media
    } = useContext(GlobalContext)

    /* Functions */
    const handleClick = () => {
        sideMenuOpen ? setSideMenuOpen(false) : setSideMenuOpen(true)
    }

    /* JSX Output */
    if (media === "desktop") {
        return <></>
    } else {
        return (
            <div className="hamburger-container">
                <img
                    alt={"Menu"}
                    onClick={() => handleClick()}
                    src={menuIcon} />
            </div>
        )
    }
}

export default Hamburger
