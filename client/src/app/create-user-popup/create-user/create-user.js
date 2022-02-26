import React, {useContext} from "react";
import {GlobalContext} from "../../../context/global-context";
import {CreateUserContext} from "../../../context/create-user-context";
import closeIconDark from "../../../assets/images/close-icon-dark.svg";
import CreateUserStageOne from "./create-user-stage-one/create-user-stage-one";
import CreateUserStageTwo from "./create-user-stage-two/create-user-stage-two";
import CreateUserStageThree from "./create-user-stage-three/create-user-stage-three";
import CreateUserError from "./create-user-error/create-user-error";
import "./create-user.scss";

const CreateUser = () => {

    /* Import Global Variables */
    const {
        setPopup,
    } = useContext(GlobalContext);

    const {
        message,
        stage,
        error,
    } = useContext(CreateUserContext);

    /* JSX Output */
    return (
        <div className='create-user-container'>
            <div className='top-container'>
                <img
                    onClick={() => setPopup('')}
                    src={closeIconDark}/>
            </div>
            <div className='title-container'>
                <h1>Create User</h1>
            </div>
            <div className='message-container'>
                <p className={message.one.highlight ? 'highlight' : ''}>
                    {message.one.string}</p>
                <p className={message.two.highlight ? 'highlight' : ''}>
                    {message.two.string}</p>
            </div>
                <div className='verification-container'>
                    { error ? <CreateUserError /> : <></> }
                    { !error && stage === 'email' ? <CreateUserStageOne /> : <></> }
                    { !error && stage === 'password' ? <CreateUserStageTwo /> : <></> }
                    { !error && stage === 'create-user' ? <CreateUserStageThree /> : <></> }
                </div>
            }
        </div>
    )
}

export default CreateUser;