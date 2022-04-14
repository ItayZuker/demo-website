import React, {useContext, useEffect} from "react";
import {GlobalContext} from "../../../../../context/global-context";
import {CreateChatInvitationContext} from "../../../../../context/create-chat-invitation-context";
import CreateInvitationStageDuration from "./create-invitation-stage-duration/create-invitation-stage-duration";
import CreateInvitationStageStart from "./create-invitation-stage-start/create-invitation-stage-start";
import CreateInvitationStageIntro from "./create-invitation-stage-intro/create-invitation-stage-intro";
import closeIconDark from "../../../../../assets/images/close-icon-dark.svg";
import "./create-chat-invitation.scss";


const CreateChatInvitation = () => {

    const {
        setPopup,
    } = useContext(GlobalContext);

    const {
        title,
        setTitle,
        message,
        setMessage,
        error,
        stage,
        setStage,
        invitation,
        setInvitation,
        followingWeek,
    } = useContext(CreateChatInvitationContext);

    useEffect(() => {
        setStage('invitation-start');
    }, []);

    const clickBack = () => {
        switch (stage) {
            case 'invitation-duration':
                setStage('invitation-type');
                break;
            case 'invitation-time-start':
                setStage('invitation-duration');
                break;
            default:
                setStage('invitation-type');
        }
    };

    if (!followingWeek.length) {
        return <></>
    } else {
        return (
            <div className='create-chat-invitation-container'>
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
                    {/*{error ? <CreateUserError /> : <></>}*/}
                    {!error && stage === 'invitation-start' ? <CreateInvitationStageStart /> : <></>}
                    {!error && stage === 'invitation-duration' ? <CreateInvitationStageDuration /> : <></>}
                    {!error && stage === 'invitation-title' ? <CreateInvitationStageIntro /> : <></>}

                    {/*{!error && stage === 'password' ? <CreateUserStagePassword /> : <></>}*/}
                    {/*{!error && stage === 'create-user' ? <CreateUserStageCreateUser /> : <></>}*/}
                </div>
                <div className='bottom-container'>
                    {/*<div*/}
                    {/*    onClick={() => clickBack()}*/}
                    {/*    className={'back-button-container ' + (stage !== 'invitation-type' && !error ? '' : 'hide')}>*/}
                    {/*</div>*/}
                </div>
            </div>
        )
    }
};

export default CreateChatInvitation;