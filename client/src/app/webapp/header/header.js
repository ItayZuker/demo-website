import React from "react"
import Logo from "./logo/logo"
import User from "./user/user"
import "./header.scss"

const Header = () => {
    /* JSX Output */
    return (
        <div className="header-container">
            <Logo />
            <User />
        </div>
    )
}

export default Header
