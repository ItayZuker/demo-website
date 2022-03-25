import React, {useContext, useEffect, useState} from "react";
import {CreateInvitationContext} from "../../../../../../context/create-invitation-context";
import Button from "../../../../../../components/button/button";
import "./create-invitation-stage-day.scss";

const CreateInvitationStageDay = () => {

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

    const handleClick = (day) => {
        setInvitation(prevState => {
            return {...prevState, day: day};
        });
    };

    return (
        <div className='create-invitation-day-container'>
            <div className='selection-container'>
                {nextWeek.map((day, index) => {
                    return <div
                        key={index}
                        onClick={() => handleClick(day)}
                        className={'day-container ' + (invitation.day.day.name === day.day.name ? 'selected' : '')}>
                        <p className='day'>{day.day.name}</p>
                        <p className='date'>{day.date.mm + '/' + day.date.dd}</p>
                        <p className={'today ' + (day.isToday ? '' : 'hide')}>Today</p>
                    </div>
                })}
            </div>
            <Button
                isActive={!!invitation.day.day.name}
                loading={false}
                value={'Next'}
                callback={setNext}/>
        </div>
    )
};

export default CreateInvitationStageDay;