import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../../../../context/global-context";
import {CreateChatInvitationContext} from "../../../../../../context/create-chat-invitation-context";
import Button from "../../../../../../components/button/button";
import "./create-chat-invitation-success.scss";

const CreateChatInvitationSuccess = () => {

    const {
        setPopup,
    } = useContext(GlobalContext);

    const {
        setTitle,
        setMessage,
        setStage
    } = useContext(CreateChatInvitationContext);

    const [anotherInvitation, setAnotherInvitation] = useState(false);
    const [close, setClose] = useState(false);

    useEffect(() => {
        if (close) {
            setPopup('');
        }
    }, [close]);

    useEffect(() => {
        if (anotherInvitation) {
            setStage('invitation-start');
        }
    }, [anotherInvitation])

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
        <div className='create-chat-invitation-success-container'>
            <div className='title-container'>
                <h1>Great!</h1>
                <p>your chat invitation was created successfully.</p>
            </div>
            <div className='buttons-container'>
                <Button
                    isActive={true}
                    loading={false}
                    value={'close'}
                    callback={setClose}/>
                <Button
                    isActive={true}
                    loading={false}
                    value={'Create another chat invitation'}
                    callback={setAnotherInvitation}/>

            </div>
        </div>
    )
};

export default CreateChatInvitationSuccess;