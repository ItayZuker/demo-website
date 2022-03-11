import React from "react";
import Logo from "./logo/logo";
import Navigation from "./navigation/navigation";
import Hamburger from "./hamburger/hamburger";
import LoginButton from "./login-button/login-button";
import './header.scss';

const Header = () => {

    /* JSX Output */
    return (
        <div className='header-container'>
            <Logo />
            <Navigation />
            <Hamburger />
            <LoginButton />
        </div>
    )
};

export default Header;