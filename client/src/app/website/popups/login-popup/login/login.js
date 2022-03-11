import React, {useContext} from "react";
import {GlobalContext} from "../../../../../context/global-context";
import {LoginContext} from "../../../../../context/login-context";
import closeIconDark from "../../../../../assets/images/close-icon-dark.svg";
import LoginStageOne from "./login-stage-one/login-stage-one";
import LoginStageTwo from "./login-stage-two/login-stage-two";
import "./login.scss";

const Login = () => {

    /* Import Global Variables */
    const {
        popup,
        setPopup,
    } = useContext(GlobalContext);

    const {
        message,
        stage,
    } = useContext(LoginContext);

    /* JSX Output */
    if (popup !== 'login') {
        return <></>
    } else {
        return (
            <div className='login-container'>
                <div className='top-container'>
                    <img
                        onClick={() => setPopup('')}
                        src={closeIconDark}/>
                </div>
                <div className='title-container'>
                    <h1>Login</h1>
                </div>
                <div className='message-container'>
                    <p className={message.one.highlight ? 'highlight' : ''}>
                        {message.one.string}</p>
                    <p className={message.two.highlight ? 'highlight' : ''}>
                        {message.two.string}</p>
                </div>
                <div className='verification-container'>
                    {stage === 'email' ? <LoginStageOne /> : <></>}
                    {stage === 'password' ? <LoginStageTwo /> : <></>}
                </div>
            </div>
        )
    }
}

export default Login;