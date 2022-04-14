import React, {useContext, useEffect, useState} from "react";
import {CreateChatInvitationContext} from "../../../../../../context/create-chat-invitation-context";
import InputTime from "../../../../../../components/input-time/input-time";
import Button from "../../../../../../components/button/button";
import InputDay from "../../../../../../components/input-day/input-day";
import "./create-invitation-stage-start.scss";

const CreateInvitationStageStart = () => {

    /* Global variables */
    const {
        setInvitation,
        invitation,
        setTitle,
        setMessage,
        followingWeek,
        getTime,
        minimumDelay,
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
        const timeData = getTime(followingWeek[0], minimumDelay);
        setInvitation(prevState => {
            return {...prevState,
                start: timeData,
            };
        });
    };

    const updateStageTitles = () => {
       setTitle('Start');
       setMessage(prevState => {
          return {...prevState,
              one: {
                  string: 'When will you start talking?',
                    highlight: false,
              },
             two: {
                string: '',
                    highlight: false,
                }};
        });
    };

    /* JSX Output */
    if (!invitation.start.set) {
        return <></>
    } else {
        return (
            <div className='create-invitation-stage-start-container'>
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

export default CreateInvitationStageStart;