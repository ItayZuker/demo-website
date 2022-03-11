import React from "react";
import './header.scss';
import Logo from "./logo/logo";
import User from "./user/user";

const Header = () => {

    /* JSX Output */
    return (
        <div className='header-container'>
            <Logo />
            <User />
        </div>
    )
};

export default Header;