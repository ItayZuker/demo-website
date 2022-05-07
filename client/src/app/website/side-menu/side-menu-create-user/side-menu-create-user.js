import React, { useContext } from "react"
import { GlobalContext } from "../../../../context/global-context"
import "./side-menu-create-user.scss"

const SideMenuCreateUser = () => {
    const {
        setPopup,
        setSideMenuOpen
    } = useContext(GlobalContext)

    const handleClick = () => {
        setPopup("create-user")
        setSideMenuOpen(false)
    }

    return (
        <div className="side-menu-create-user-container">
            <div
                onClick={() => handleClick()}
                className="create-user-button">
                <p>Create User</p>
            </div>
        </div>
    )
}

export default SideMenuCreateUser
