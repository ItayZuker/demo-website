import React, {useContext, useEffect, useState} from "react";
import {CreateInvitationContext} from "../../../../../../context/create-invitation-context";
import InputTime from "../../../../../../components/input-time/input-time";
import Button from "../../../../../../components/button/button";
import InputDay from "../../../../../../components/input-day/input-day";
import "./create-invitation-stage-time-start.scss";

const CreateInvitationStageTimeStart = () => {

    /* Global variables */
    const {
        setInvitation,
        invitation,
        setTitle,
        setMessage,
        followingWeek,
        getTime,
        minimumDelay,
    } = useContext(CreateInvitationContext);

    /* Locale variables */
    const [next, setNext] = useState(false);

    /* Triggers */
    useEffect(() => {
        if (next) {
            if (invitation.type === 'chat') {
                // setStage('invitation-intro')  ;
            } else {
                // setStage('invitation-intro');
            }
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
       if (invitation.type === 'chat') {
           setTitle('Chat')
           setMessage(prevState => {
              return {...prevState,
                  one: {
                      string: 'When will the chat start?',
                        highlight: false,
                  },
                 two: {
                    string: '',
                        highlight: false,
                    }};
            });
        } else {
            setTitle('Date')
            setMessage(prevState => {
                return {...prevState,
                    one: {
                        string: 'When will you meet?',
                        highlight: false,
                    },
                    two: {
                        string: '',
                        highlight: false,
                    }};
            });
        }
    }

    /* JSX Output */
    if (!invitation.start.set) {
        return <></>
    } else {
        return (
            <div className='create-invitation-time-start-container'>
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

export default CreateInvitationStageTimeStart;