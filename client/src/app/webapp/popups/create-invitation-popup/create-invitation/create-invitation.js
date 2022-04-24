import React, {useContext, useEffect} from "react";
import {GlobalContext} from "../../../../../context/global-context";
import {CreateInvitationContext} from "../../../../../context/create-invitation-context";
import CreateInvitationError from "./create-invitation-error/create-invitation-error";
import CreateInvitationType from "./create-invitation-type/create-invitation-type"
import CreateInvitationStart from "./create-invitation-start/create-invitation-start";
import CreateInvitationDuration from "./create-invitation-duration/create-invitation-duration";
import CreateInvitationIntro from "./create-invitation-intro/create-invitation-intro";
import CreateInvitationSuccess from "./create-invitation-success/create-invitation-success";
import "./create-invitation.scss";


const CreateInvitation = () => {

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
    } = useContext(CreateInvitationContext);

    useEffect(() => {
        setStage('invitation-type');
    }, []);

    const clickBack = () => {
        switch (stage) {
            case 'invitation-start':
                setStage('invitation-type');
                break;
            case 'invitation-duration':
                setStage('invitation-start');
                break;
            case 'invitation-intro':
                setStage('invitation-duration');
                break;
            default:
                setStage('invitation-start');
        }
    };

    if (!followingWeek.length) {
        return <></>
    } else {
        return (
            <div className='create-invitation-container'>
                <div className='top-container'>
                    <div
                        onClick={() => clickBack()}
                        className={'back-icon-container ' + (stage === 'invitation-type' || stage === 'invitation-success' || error ? 'hide' : '' )}>
                        <svg width="56" height="91" viewBox="0 0 56 91" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.93001 52.4299L38.29 87.7899C42.2 91.6999 48.53 91.6999 52.43 87.7899C56.34 83.8799 56.34 77.5499 52.43 73.6499L27.64 48.8599C25.71 46.9299 25.71 43.7999 27.64 41.8699L52.43 17.0799C56.34 13.1699 56.34 6.83995 52.43 2.93995C48.52 -0.970054 42.19 -0.970054 38.29 2.93995L2.93001 38.2999C-0.969995 42.1999 -0.969995 48.5399 2.93001 52.4399V52.4299Z" fill="black"/>
                        </svg>
                    </div>
                    <div
                        onClick={() => setPopup('')}
                        className='close-icon-container'>
                        <svg width="91" height="91" viewBox="0 0 91 91" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M62.9901 41.8601L87.7801 17.0701C91.6901 13.1601 91.6901 6.83006 87.7801 2.93006C83.8701 -0.979941 77.5401 -0.979941 73.6401 2.93006L48.8501 27.7201C46.9201 29.6501 43.7901 29.6501 41.8601 27.7201L17.0701 2.93006C13.1601 -0.979941 6.83006 -0.979941 2.93006 2.93006C-0.979941 6.84006 -0.979941 13.1701 2.93006 17.0701L27.7201 41.8601C29.6501 43.7901 29.6501 46.9201 27.7201 48.8501L2.93006 73.6401C-0.979941 77.5501 -0.979941 83.8801 2.93006 87.7801C6.84006 91.6901 13.1701 91.6901 17.0701 87.7801L41.8601 62.9901C43.7901 61.0601 46.9201 61.0601 48.8501 62.9901L73.6401 87.7801C77.5501 91.6901 83.8801 91.6901 87.7801 87.7801C91.6901 83.8701 91.6901 77.5401 87.7801 73.6401L62.9901 48.8501C61.0601 46.9201 61.0601 43.7901 62.9901 41.8601Z" fill="black"/>
                        </svg>
                    </div>
                </div>
                <div className='title-container'>
                    <h1>{title}</h1>
                </div>
                <div className='message-container'>
                    <p className={message.highlight ? 'highlight' : ''}>
                        {message.string}</p>
                </div>
                <div className='verification-container'>
                    {error ? <CreateInvitationError /> : <></>}
                    {!error && stage === 'invitation-type' ? <CreateInvitationType /> : <></>}
                    {!error && stage === 'invitation-start' ? <CreateInvitationStart /> : <></>}
                    {!error && stage === 'invitation-duration' ? <CreateInvitationDuration /> : <></>}
                    {!error && stage === 'invitation-intro' ? <CreateInvitationIntro /> : <></>}
                    {!error && stage === 'invitation-success' ? <CreateInvitationSuccess /> : <></>}
                </div>
                <div className='bottom-container'>
                </div>
            </div>
        )
    }
};

export default CreateInvitation;