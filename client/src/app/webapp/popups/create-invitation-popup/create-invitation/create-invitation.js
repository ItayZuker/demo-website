import React, {useContext, useEffect} from "react";
import {GlobalContext} from "../../../../../context/global-context";
import {CreateInvitationContext} from "../../../../../context/create-invitation-context";
import CreateInvitationStageChooseType from "./create-invitation-stage-type/create-invitation-stage-type";
import CreateInvitationStageDay from "./create-invitation-stage-day/create-invitation-stage-day";
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
    } = useContext(CreateInvitationContext);

    useEffect(() => {
        setTitle('Create Invitation');
        setMessage(prevState => {
            return {...prevState,
                one: {
                    string: 'What type of invitation would you like to create?',
                    highlight: false,
                },
                two: {
                    string: '',
                    highlight: false,
                }};
        });
        setStage('invitation-type');
    }, []);

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
                {!error && stage === 'invitation-day' ? <CreateInvitationStageDay /> : <></>}
                {/*{!error && stage === 'email' ? <CreateUserStageEmail /> : <></>}*/}
                {/*{!error && stage === 'password' ? <CreateUserStagePassword /> : <></>}*/}
                {/*{!error && stage === 'create-user' ? <CreateUserStageCreateUser /> : <></>}*/}
            </div>
        </div>
    )
};

export default CreateInvitation;