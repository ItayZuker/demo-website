import React, {useContext, useEffect, useState} from "react";
import {CreateChatInvitationContext} from "../../../../../../context/create-chat-invitation-context";
import Button from "../../../../../../components/button/button";
import InputTextArea from "../../../../../../components/input-text-area/input-text-area";
import "./create-invitation-stage-intro.scss";

const CreateInvitationStageIntro = () => {

    /* Global Variables */
    const {
        setInvitation,
        setTitle,
        setMessage,
    } = useContext(CreateChatInvitationContext);

    /* Local Variables */
    const [intro, setIntro] = useState('');
    const [submit, setSubmit] = useState(false);

    /* Triggers */
    useEffect(() => {
        if (submit) {
            // submitInvitation()
        }
    }, [submit]);

    useEffect(() => {
        updateIntro(intro);
    }, [intro]);

    useEffect(() => {
        updateStageIntro();
    }, []);

    /* Functions */
    const updateStageIntro = () => {
        setTitle('Intro');
        setMessage(prevState => {
            return {...prevState,
                one: {
                    string: 'Add an intro for your invitation:',
                    highlight: false,
                },
                two: {
                    string: '',
                    highlight: false,
                }};
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
        <div className='create-invitation-stage-intro-container'>
            <div className='selection-container'>
                <InputTextArea
                    valueCallback={setIntro}
                    typeLimit={300}/>
            </div>
            <Button
                isActive={false}
                loading={false}
                value={'Create Invitation'}
                callback={setSubmit}/>
        </div>
    )
};

export default CreateInvitationStageIntro;