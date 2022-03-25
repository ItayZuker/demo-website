import React, {useContext, useEffect, useState} from "react";
import {CreateInvitationContext} from "../../../../../../context/create-invitation-context";
import Button from "../../../../../../components/button/button";
import "./create-invitation-stage-time-start.scss";

const CreateInvitationStageTimeStart = () => {

    const {
        setStage,
        invitation,
        setInvitation,
        setTitle,
        setMessage,
        nextWeek,
    } = useContext(CreateInvitationContext);

    const [next, setNext] = useState(false);

    useEffect(() => {
        if (next) {
            if (invitation.type === 'chat') {
                setStage('invitation-repeat')  ;
            } else {
                setStage('invitation-repeat');
            }
        }
    }, [next]);

    useEffect(() => {
        if (invitation.type === 'chat') {
            setTitle('Chat')
            setMessage(prevState => {
                return {...prevState,
                    one: {
                        string: 'Please select a day, for a chat invitation:',
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
                        string: 'Please select a day, for a date invitation:',
                        highlight: false,
                    },
                    two: {
                        string: '',
                        highlight: false,
                    }};
            });
        }
    }, []);



    return (
        <div className='create-invitation-day-container'>
            <div className='selection-container'>
            </div>
            <Button
                isActive={!!invitation.day.day.name}
                loading={false}
                value={'Next'}
                callback={setNext}/>
        </div>
    )
};

export default CreateInvitationStageTimeStart;