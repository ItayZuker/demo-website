import React, {useContext, useEffect, useState} from "react";
import {CreateChatInvitationContext} from "../../../../../../context/create-chat-invitation-context";
import InputTime from "../../../../../../components/input-time/input-time";
import Button from "../../../../../../components/button/button";
import InputDay from "../../../../../../components/input-day/input-day";
import "./create-chat-invitation-start.scss";

const CreateChatInvitationStart = () => {

    /* Global variables */
    const {
        setInvitation,
        invitation,
        setTitle,
        setMessage,
        followingWeek,
        setStage,
    } = useContext(CreateChatInvitationContext);

    /* Locale variables */
    const [next, setNext] = useState(false);

    /* Triggers */
    useEffect(() => {
        if (next) {
            setStage('invitation-duration')  ;
        }
    }, [next]);

    useEffect(() => {
        updateStageTitles();
        updateDaySelection();
    }, []);

    /* Functions */
    const updateDaySelection = () => {
        setInvitation(prevState => {
            return {...prevState,
                start: {
                    set: true,
                    timeStamp: followingWeek[0]
                },
            };
        });
    };

    const updateStageTitles = () => {
       setTitle('Start');
       setMessage({
          string: 'When will you start talking?',
          highlight: false,
        });
    };

    /* JSX Output */
    if (!invitation.start.set) {
        return <></>
    } else {
        return (
            <div className='create-chat-invitation-start-container'>
                <div className='selection-container'>
                    <InputTime />
                    <InputDay />
                </div>
                <Button
                    isActive={invitation.start.set}
                    loading={false}
                    value={'Next'}
                    callback={setNext}/>
            </div>
        )
    }
};

export default CreateChatInvitationStart;