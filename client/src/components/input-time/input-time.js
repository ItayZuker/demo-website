import React, {useContext, useEffect, useState} from "react";
import {CreateChatInvitationContext} from "../../context/create-chat-invitation-context";
import "./input-time.scss";

const InputTime = () => {

    /* Global variables */
    const {
        invitation,
        setInvitation,
    } = useContext(CreateChatInvitationContext);

    /* Local variables */
    const [change, setChange] = useState('');

    useEffect(() => {
        updateMinuteDisplay();
        updateHourDisplay();
    }, [invitation.start]);

    /* Functions */
    const convertValueToString = (value) => {
        let string = String(value)
        if (string.length === 2) {
            return string
        } else {
            string = '0' + string
            return string;
        }
    };

    const checkHourDiff = () => {
        const currentHours = Number(document.getElementById('input-hour-id').innerText);
        const newValue = invitation.start.timeStamp.getHours();
        return currentHours !== newValue;
    };

    const updateHourDisplay = () => {
        const isDiff = checkHourDiff()
        if (isDiff) {
            const prevElement = document.getElementById('input-hour-id');
            const newValue = invitation.start.timeStamp.getHours();
            const newElement = document.createElement('p');
            newElement.classList.add('current-element');
            newElement.innerText = convertValueToString(newValue);
            prevElement.parentElement.appendChild(newElement);
            if (change === 'plus') {
                prevElement.id = '';
                prevElement.classList.add('out-from-top');
                setTimeout(() => {
                    prevElement.remove();
                    newElement.classList.remove('in-from-bottom');
                }, 200);
                newElement.classList.add('in-from-bottom');
                newElement.id = 'input-hour-id';
            } else {
                prevElement.id = '';
                prevElement.classList.add('out-from-bottom');
                setTimeout(() => {
                    prevElement.remove();
                    newElement.classList.remove('in-from-top');
                }, 200);
                newElement.classList.add('in-from-top');
                newElement.id = 'input-hour-id';
            }
        }
    };

    const checkMinuteDiff = () => {
        const currentMinutes = Number(document.getElementById('input-minute-id').innerText);
        const newValue = invitation.start.timeStamp.getMinutes();
        return currentMinutes !== newValue;
    };

    const updateMinuteDisplay = () => {
        const isDiff = checkMinuteDiff()
        if (isDiff) {
            const prevElement = document.getElementById('input-minute-id');
            const newValue = invitation.start.timeStamp.getMinutes();
            const newElement = document.createElement('p');
            newElement.classList.add('current-element');
            newElement.innerText = convertValueToString(newValue);
            prevElement.parentElement.appendChild(newElement);
            if (change === 'plus') {
                prevElement.id = '';
                prevElement.classList.add('out-from-top');
                setTimeout(() => {
                    prevElement.remove();
                    newElement.classList.remove('in-from-bottom');
                }, 200);
                newElement.classList.add('in-from-bottom');
                newElement.id = 'input-minute-id';
            } else {
                prevElement.id = '';
                prevElement.classList.add('out-from-bottom');
                setTimeout(() => {
                    prevElement.remove();
                    newElement.classList.remove('in-from-top');
                }, 200);
                newElement.classList.add('in-from-top');
                newElement.id = 'input-minute-id';
            }
        }
    };

    const getNewMinute = (math, currentMinuteValue) => {
        if (math === 'plus') {
            if (currentMinuteValue < 59) {
                return currentMinuteValue + 1;
            } else {
                return 0;
            }
        } else {
            if (currentMinuteValue > 0) {
                return currentMinuteValue - 1;
            } else {
                return 59;
            }
        }
    };

    const getNewMinuteTimeStamp = (minute) => {
        const year = invitation.start.timeStamp.getFullYear();
        const monthIndex = invitation.start.timeStamp.getMonth();
        const day = invitation.start.timeStamp.getDate();
        const hours = invitation.start.timeStamp.getHours();
        return new Date(year, monthIndex, day, hours, minute);
    }

    const getNewHourTimeStamp = (hours) => {
        const year = invitation.start.timeStamp.getFullYear();
        const monthIndex = invitation.start.timeStamp.getMonth();
        const day = invitation.start.timeStamp.getDate();
        const minute = invitation.start.timeStamp.getMinutes()
        return new Date(year, monthIndex, day, hours, minute);
    }

    const updateMinuteClick = (math) => {
        setChange(math);
        const minute = getNewMinute(math, invitation.start.timeStamp.getMinutes());
        const newMinuteTimeStamp = getNewMinuteTimeStamp(minute);
        setInvitation(prevState => {
            return {...prevState,
                start: {
                    set: true,
                    timeStamp: newMinuteTimeStamp
                },
            };
        });
    };

    const updateMinuteInterval = (math) => {
        setChange(math);
        let interval = setInterval(() => {
            const currentMinute = Number(document.getElementById('input-minute-id').innerText);
            const newMinute = getNewMinute(math, currentMinute);
            const newMinuteTimeStamp = getNewMinuteTimeStamp(newMinute);
            setInvitation(prevState => {
                return {...prevState,
                    start: {
                        set: true,
                        timeStamp: newMinuteTimeStamp
                    },
                };
            });
        }, 200);
        document.addEventListener('mouseup', () => clearInterval(interval));
    };

    const getNewHour = (math, currentHourValue) => {
        if (math === 'plus') {
            if (currentHourValue < 23) {
                return currentHourValue + 1;
            } else {
                return 0;
            }
        } else {
            if (currentHourValue > 0) {
                return currentHourValue - 1;
            } else {
                return 23;
            }
        }
    };

    const updateHourInterval = (math) => {
        setChange(math);
        let interval = setInterval(() => {
            const currentHours = Number(document.getElementById('input-hour-id').innerText);
            const hours = getNewHour(math, currentHours);
            const newHourTimeStamp = getNewHourTimeStamp(hours);
            setInvitation(prevState => {
                return {...prevState,
                    start: {
                        set: true,
                        timeStamp: newHourTimeStamp
                    },
                };
            });
        }, 200);
        document.addEventListener('mouseup', () => clearInterval(interval));
    };

    const updateHourClick = (math) => {
        setChange(math);
        const hours = getNewHour(math, invitation.start.timeStamp.getHours());
        const newHourTimeStamp = getNewHourTimeStamp(hours);
        setInvitation(prevState => {
            return {...prevState,
                start: {
                    set: true,
                    timeStamp: newHourTimeStamp
                },
            };
        });
    };

    /* JSX Output */
    return (
        <div className='input-time-container'>
            <div className='hour-container'>
                <div
                    onClick={() => updateHourClick('plus')}
                    onMouseDown={() => updateHourInterval('plus')}
                    className='plus-arrow'>
                </div>
                <div className='value-container'>
                    <p id='input-hour-id'>
                    </p>
                </div>
                <div
                    onClick={(e) => updateHourClick('minus')}
                    onMouseDown={() => updateHourInterval('minus')}
                    className='minus-arrow'>
                </div>
            </div>
            <span className='colon'>:</span>
            <div className='minuets-container'>
                <div
                    onClick={() => updateMinuteClick('plus')}
                    onMouseDown={() => updateMinuteInterval('plus')}
                    className='plus-arrow'>
                </div>
                <div className='value-container'>
                    <p id='input-minute-id'>
                    </p>
                </div>
                <div
                    onClick={() => updateMinuteClick('minus')}
                    onMouseDown={() => updateMinuteInterval('minus')}
                    className='minus-arrow'>
                </div>
            </div>
        </div>
    )
};

export default InputTime;