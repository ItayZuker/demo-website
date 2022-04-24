import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../../../../context/global-context";
import {CreateInvitationContext} from "../../../../../../context/create-invitation-context";
import Button from "../../../../../../components/button/button";
import "./create-invitation-error.scss";

const CreateInvitationError = () => {

    const {
        setPopup,
    } = useContext(GlobalContext);

    const {
        setTitle,
        setMessage,
        setStage,
        setError
    } = useContext(CreateInvitationContext);

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
        <div className='create-invitation-error-container'>
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

export default CreateInvitationError;