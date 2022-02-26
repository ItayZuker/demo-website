import React, {useContext} from "react";
import './side-menu-login.scss';
import {GlobalContext} from "../../../context/global-context";

const SideMenuLogin = () => {

    const {
        setPopup,
        setSideMenuOpen,
    } = useContext(GlobalContext);

    const handleClick = () => {
        setPopup('login');
        setSideMenuOpen(false);
    };

    return (
        <div className='side-menu-login-container'>
            <div
                onClick={() => handleClick()}
                className='login-button'>
                <p>Login</p>
            </div>
        </div>
    )
}

export default SideMenuLogin;