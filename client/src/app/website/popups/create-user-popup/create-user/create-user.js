import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../../../context/global-context";
import {CreateUserContext} from "../../../../../context/create-user-context";
import closeIconDark from "../../../../../assets/images/close-icon-dark.svg";
import CreateUserStageAgeLimit from "./create-user-stage-age-limit/create-user-stage-age-limit";
import CreateUserStageEmail from "./create-user-stage-email/create-user-stage-email";
import CreateUserStagePassword from "./create-user-stage-password/create-user-stage-password";
import CreateUserStageCreateUser from "./create-user-stage-create-user/create-user-stage-create-user";
import CreateUserError from "./create-user-error/create-user-error";
import "./create-user.scss";

const CreateUser = () => {

    /* Import Global Variables */
    const {
        setPopup,
        geoData,
    } = useContext(GlobalContext);

    const {
        message,
        stage,
        error,
        title,
    } = useContext(CreateUserContext);

    /* JSX Output */
    if (!geoData.ageLimit) {
        setPopup('');
        return <></>
    } else {
        return (
            <div className='create-user-container'>
                <div className='top-container'>
                    <img
                        onClick={() => setPopup('')}
                        src={closeIconDark}/>
                </div>
                <div className='title-container'>
                    <h1>{title}</h1>
                </div>
                <div className='message-container'>
                    <p className={message.one.highlight ? 'highlight' : ''}>
                        {message.one.string}</p>
                    <p className={message.two.highlight ? 'highlight' : ''}>
                        {message.two.string}</p>
                </div>
                <div className='verification-container'>
                    {error ? <CreateUserError /> : <></>}
                    {!error && stage === 'age-limit' ? <CreateUserStageAgeLimit /> : <></>}
                    {!error && stage === 'email' ? <CreateUserStageEmail /> : <></>}
                    {!error && stage === 'password' ? <CreateUserStagePassword /> : <></>}
                    {!error && stage === 'create-user' ? <CreateUserStageCreateUser /> : <></>}
                </div>
            </div>
        )
    }
};

export default CreateUser;