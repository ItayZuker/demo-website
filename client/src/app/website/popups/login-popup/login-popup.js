import React, {useContext} from "react";
import {GlobalContext} from "../../../../context/global-context";
import {LoginContextComponent} from "../../../../context/login-context";
import Login from "./login/login";
import "./login-popup.scss";

const LoginPopup = () => {

    /* Import Global Variables */
    const {
        popup,
    } = useContext(GlobalContext);

    /* JSX Output */
    if(popup !== 'login') {
        return <></>
    } else {
        return (
            <div className='login-popup-container'>
                <LoginContextComponent>
                    <Login />
                </LoginContextComponent>
            </div>
        )
    }
}

export default LoginPopup;