import React, {useContext, useEffect} from "react";
import "./create-invitation.scss";
import {GlobalContext} from "../../../../../context/global-context";
import closeIconDark from "../../../../../assets/images/close-icon-dark.svg";
import CreateUserError
    from "../../../../website/popups/create-user-popup/create-user/create-user-error/create-user-error";
import CreateUserStageAgeLimit
    from "../../../../website/popups/create-user-popup/create-user/create-user-stage-age-limit/create-user-stage-age-limit";
import CreateUserStageEmail
    from "../../../../website/popups/create-user-popup/create-user/create-user-stage-email/create-user-stage-email";
import CreateUserStagePassword
    from "../../../../website/popups/create-user-popup/create-user/create-user-stage-password/create-user-stage-password";
import CreateUserStageCreateUser
    from "../../../../website/popups/create-user-popup/create-user/create-user-stage-create-user/create-user-stage-create-user";
import {CreateInvitationContext} from "../../../../../context/create-invitation-context";

const CreateInvitation = () => {

    const {
        setPopup,
    } = useContext(GlobalContext);

    const {
        title,
        setTitle
    } = useContext(CreateInvitationContext);

    useEffect(() => {
        setTitle('Invitation Type');
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
                {/*<p className={message.one.highlight ? 'highlight' : ''}>*/}
                {/*    {message.one.string}</p>*/}
                {/*<p className={message.two.highlight ? 'highlight' : ''}>*/}
                {/*    {message.two.string}</p>*/}
            </div>
            <div className='verification-container'>
                {/*{error ? <CreateUserError /> : <></>}*/}
                {/*{!error && stage === 'age-limit' ? <CreateUserStageAgeLimit /> : <></>}*/}
                {/*{!error && stage === 'email' ? <CreateUserStageEmail /> : <></>}*/}
                {/*{!error && stage === 'password' ? <CreateUserStagePassword /> : <></>}*/}
                {/*{!error && stage === 'create-user' ? <CreateUserStageCreateUser /> : <></>}*/}
            </div>
        </div>
    )
};

export default CreateInvitation;