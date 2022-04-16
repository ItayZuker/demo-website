import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../../../../context/global-context";
import {CreateChatInvitationContext} from "../../../../../../context/create-chat-invitation-context";
import Button from "../../../../../../components/button/button";
import "./create-chat-invitation-error.scss";

const CreateChatInvitationError = () => {

    const {
        setPopup,
    } = useContext(GlobalContext);

    const {
        setTitle,
        setMessage,
        setStage,
        setError
    } = useContext(CreateChatInvitationContext);

    const [tryAgain, setTryAgain] = useState(false);
    const [close, setClose] = useState(false);

    useEffect(() => {
        if (close) {
            setPopup('');
        }
    }, [close]);

    useEffect(() => {
        if (tryAgain) {
            setError(false);
            setStage('invitation-start');
        }
    }, [tryAgain])

    useEffect(() => {
        updateStageSuccess()
    }, [])

    const updateStageSuccess = () => {
        setTitle('');
        setMessage({
            string: '',
            highlight: false,
        });
    }

    return (
        <div className='create-chat-invitation-error-container'>
            <div className='title-container'>
                <h1>Error...</h1>
                <p>Something went wrong.</p>
            </div>
            <div className='buttons-container'>
                <Button
                    isActive={true}
                    loading={false}
                    value={'Try again'}
                    callback={setTryAgain}/>
                <Button
                    isActive={true}
                    loading={false}
                    value={'close'}
                    callback={setClose}/>
            </div>
        </div>
    )
};

export default CreateChatInvitationError;