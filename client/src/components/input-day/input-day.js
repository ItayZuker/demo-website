import React, {useContext, useEffect, useState} from "react";
import {CreateInvitationContext} from "../../context/create-invitation-context";
import InputHandle from "../input-handle/input-handle";
import "./input-day.scss";

const InputDay = () => {

    /* Global variables */
    const {
        daysList,
        setInvitation,
        invitation,
        followingWeek,
    } = useContext(CreateInvitationContext);

    /* Local variables */
    const [repeat, setRepeat] = useState(false);

    useEffect(() => {
        updateInvitationRepeat();
    }, [repeat]);

    /* Functions */
    const updateInvitationRepeat = () => {
        setInvitation(prevState => {
            return {...prevState,
                repeat: repeat,
            };
        });
    };

    const selectDay = (dayShort) => {
        const dayData = followingWeek.find(item => item.day.short === dayShort)
        setInvitation(prevState => {
            return {...prevState,
                start: {...prevState.start,
                    day: dayData.day,
                },
            };
        });
    };

    /* JSX Output */
    return (
        <div className='input-day-container'>
            <div className='selected-date-container'>
                {
                    repeat ?
                        <p>
                            <span className='day'>Every {invitation.start.day.name}</span>
                        </p>
                        :
                        <p>
                            <span className='day'>{invitation.start.day.name}</span>
                            -
                            <span className='month'>{invitation.start.month.short}</span>
                            <span className='metric-day'>{invitation.start.day.metricDayInTheMonth}</span>
                        </p>
                }
            </div>
            <div className='all-week-container'>
                {daysList.map((day, index) => {
                    return (
                        <div
                            onClick={() => selectDay(day.short)}
                            className={'day-item-container ' + (invitation.start.day.short === day.short ? 'selected' : '')}
                            key={index}>
                            <p>{day.short}</p>
                        </div>
                    )
                })}
            </div>
            <div className='repeat-container'>
                <InputHandle
                    innitial={repeat}
                    valueOff={'No repeat'}
                    valueOn={'Repeat'}
                    isActive={true}
                    callback={setRepeat}/>
            </div>
        </div>
    )
};

export default InputDay;