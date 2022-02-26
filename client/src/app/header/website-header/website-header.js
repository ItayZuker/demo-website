import React from "react";
import Logo from "./logo/logo";
import Navigation from "./navigation/navigation";
import Hamburger from "./hamburger/hamburger";
import User from "./user/user";
import "./website-header.scss";

const WebsiteHeader = () => {

    return (
        <div className='website-header-container'>
            <Logo />
            <Navigation />
            <Hamburger />
            <User />
        </div>
    )
};

export default WebsiteHeader;