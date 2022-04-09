import React, {useContext, useEffect, useState} from "react";
import {CreateInvitationContext} from "../../context/create-invitation-context";
import "./input-time.scss";

const InputTime = () => {

    /* Global variables */
    const {
        invitation,
        setInvitation,
    } = useContext(CreateInvitationContext);

    /* Local variables */
    const [change, setChange] = useState('');

    /* Triggers */
    useEffect(() => {
        updateMinuteDisplay();
    }, [invitation.start.time.minute]);

    useEffect(() => {
        updateHourDisplay();
    }, [invitation.start.time.hour]);

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

    const updateHourDisplay = () => {
        const prevElement = document.getElementById('input-hour-id');
        const newValue = invitation.start.time.hour;
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
    };

    const updateMinuteDisplay = () => {
        const prevElement = document.getElementById('input-minute-id');
        const newValue = invitation.start.time.minute;
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

    const updateMinuteClick = (math) => {
        setChange(math);
        const currentMinuteValue = invitation.start.time.minute;
        setInvitation(prevState => {
            return {...prevState,
                start: {...prevState.start,
                    time: {...prevState.start.time,
                        minute: getNewMinute(math, currentMinuteValue),
                    },
                },
            };
        });
    };

    const updateMinuteInterval = (math) => {
        setChange(math);
        let interval = setInterval(() => {
            const currentMinuteValue = Number(document.getElementById('input-minute-id').innerText);
            setInvitation(prevState => {
                return {...prevState,
                    start: {...prevState.start,
                        time: {...prevState.start.time,
                            minute: getNewMinute(math, currentMinuteValue),
                        },
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
            const currentHourValue = Number(document.getElementById('input-hour-id').innerText);
            setInvitation(prevState => {
                return {...prevState,
                    start: {...prevState.start,
                        time: {...prevState.start.time,
                            hour: getNewHour(math, currentHourValue),
                        },
                    },
                };
            });
        }, 200);
        document.addEventListener('mouseup', () => clearInterval(interval));
    };

    const updateHourClick = (math) => {
        setChange(math);
        const currentHourValue = invitation.start.time.hour;
        setInvitation(prevState => {
            return {...prevState,
                start: {...prevState.start,
                    time: {...prevState.start.time,
                        hour: getNewHour(math, currentHourValue),
                    },
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