import React, {useContext, useEffect} from "react";
import {GlobalContext} from "../../../../../context/global-context";
import {CreateInvitationContext} from "../../../../../context/create-invitation-context";
import CreateInvitationStageChooseType from "./create-invitation-stage-type/create-invitation-stage-type";
import CreateInvitationStageDuration from "./create-invitation-stage-duration/create-invitation-stage-duration";
import CreateInvitationStageTimeStart from "./create-invitation-stage-time-start/create-invitation-stage-time-start";
import closeIconDark from "../../../../../assets/images/close-icon-dark.svg";
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
    } = useContext(CreateInvitationContext);

    useEffect(() => {
        setTitle('Create Invitation');
        setMessage(prevState => {
            return {...prevState,
                one: {
                    string: 'Select invitation type:',
                    highlight: false,
                },
                two: {
                    string: '',
                    highlight: false,
                }};
        });
        setStage('invitation-type');
    }, []);

    const clickBack = () => {
        if (invitation.type === 'chat') {
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
        } else {
            switch (stage) {

            }
        }
    };

    return (
        <div className='create-invitation-container'>
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
                {!error && stage === 'invitation-type' ? <CreateInvitationStageChooseType /> : <></>}
                {!error && stage === 'invitation-duration' ? <CreateInvitationStageDuration /> : <></>}
                {!error && stage === 'invitation-time-start' ? <CreateInvitationStageTimeStart /> : <></>}

                {/*{!error && stage === 'password' ? <CreateUserStagePassword /> : <></>}*/}
                {/*{!error && stage === 'create-user' ? <CreateUserStageCreateUser /> : <></>}*/}
            </div>
            <div className='bottom-container'>
                <div
                    onClick={() => clickBack()}
                    className={'back-button-container ' + (stage !== 'invitation-type' && !error ? '' : 'hide')}>
                    <p>Back</p>
                </div>
            </div>
        </div>
    )
};

export default CreateInvitation;