import React from "react";
import Logo from "./logo/logo";
import User from "./user/user";
import "./webapp-header.scss";

const WebappHeader = () => {

    return (
        <div className='webapp-header-container'>
            <Logo />
            <User />
        </div>
    )
};

export default WebappHeader;