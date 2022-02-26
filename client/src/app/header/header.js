import React, {useContext} from "react";
import WebAppHeader from "./webapp-header/webapp-header";
import WebsiteHeader from "./website-header/website-header";
import './header.scss';
import {GlobalContext} from "../../context/global-context";

const Header = () => {

    const {
        login,
    } = useContext(GlobalContext);

    /* JSX Output */
    return (
        <div className='header-container'>
            {login ? <WebAppHeader /> : <WebsiteHeader />}
        </div>
    )
};

export default Header;