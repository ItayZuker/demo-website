import React, {useContext, useEffect, useState} from "react";
import {CreateChatInvitationContext} from "../../../../../../context/create-chat-invitation-context";
import Button from "../../../../../../components/button/button";
import InputTextArea from "../../../../../../components/input-text-area/input-text-area";
import "./create-chat-invitation-intro.scss";

const CreateChatInvitationIntro = () => {

    /* Global Variables */
    const {
        invitation,
        setInvitation,
        setTitle,
        setMessage,
        setStage,
        setError,
    } = useContext(CreateChatInvitationContext);

    /* Local Variables */
    const [intro, setIntro] = useState('');
    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);

    /* Triggers */
    useEffect(() => {
        if (submit) {
            submitInvitation()
        }
    }, [submit]);

    useEffect(() => {
        updateIntro(intro);
    }, [intro]);

    useEffect(() => {
        updateStageIntro();
    }, []);

    /* Functions */
    const handleData = async (data) => {
        setLoading(false);
        if (data.success) {
            setStage('invitation-success');
        } else {
            setError(true)
        }
    };

    const handleErr = (err) => {
        setLoading(false);
        setStage('invitation-error')
    };

    const verifyData = () => {
        return new Promise((resolve, reject) => {
            resolve();
        });
    };

    const getInvitation = () => {
        return {
            type: invitation.type,
            duration: invitation.duration,
            repeat: invitation.repeat,
            intro: invitation.intro.string,
            start: {
                timeStamp: invitation.start.timeStamp.getTime()
            },
            end: {
                unlimited: invitation.end.unlimited,
                timeStamp: invitation.end.timeStamp ? invitation.end.timeStamp.getTime() : null
            }
        }
    }

    const submitInvitation = async () => {
        setLoading(true);
        try {
            await verifyData();
            const token = window.localStorage.getItem('token');
            const res = await fetch('/profile-view/create-chat-invitation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                    invitation: getInvitation(),
                }),
            });
            const data = await res.json();
            handleData(data);
        } catch (err) {
            handleErr(err);
        }
    }

    const updateStageIntro = () => {
        setTitle('Intro');
        setMessage({
            string: 'Add an intro for your invitation:',
            highlight: false,
        });
    };

    const updateIntro = (introString) => {
        setInvitation(prevState => {
            return {...prevState,
                intro: {
                    set: true,
                    string: introString,
                },
            };
        });
    };

    /* JSX Output */
    return (
        <div className={'create-chat-invitation-intro-container ' + (loading ? 'loading' : '')}>
            <div className='selection-container'>
                <InputTextArea
                    valueCallback={setIntro}
                    typeLimit={300}/>
            </div>
            <Button
                isActive={true}
                loading={false}
                value={'Create Invitation'}
                callback={setSubmit}/>
        </div>
    )
};

export default CreateChatInvitationIntro;