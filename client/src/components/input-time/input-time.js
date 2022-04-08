import React, {useContext, useEffect, useRef, useState} from "react";
import {CreateInvitationContext} from "../../context/create-invitation-context";
import "./input-time.scss";

const InputTime = () => {

    /* Global variables */
    const {
        invitation,
        setInvitation,
        followingWeek,
        minimumDelay,
        getTime,
    } = useContext(CreateInvitationContext);

    /* Local variables */
    const [selectedMinute, setSelectedMinute] = useState(invitation.start.time.minute);
    const [selectedHour, setSelectedHour] = useState(invitation.start.time.hour);

    /* Triggers */
    useEffect(() => {
        updateMinuteDisplay();
    }, [invitation.start.time.minute]);

    useEffect(() => {
        updateHourDisplay();
        checkMinutes();
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

    const checkMinutes = () => {
        if (invitation.start.day.isToday) {
            if (invitation.start.time.hour === followingWeek[0].time.hour) {
                const minimumMinute = getMinimumMinute();
                if (invitation.start.time.minute < minimumMinute) {
                    setInvitation(prevState => {
                        return {...prevState,
                            start: {...prevState.start,
                                time: {...prevState.start.time,
                                    minute: minimumMinute,
                                },
                            },
                        };
                    });
                }
            }
        }
    }

    const updateHourDisplay = () => {
        const prevElement = document.getElementById('input-hour-id');
        const prevValue = Number(prevElement.innerText);
        const newValue = invitation.start.time.hour;
        const newElement = document.createElement('p');
        newElement.classList.add('current-element');
        newElement.innerText = convertValueToString(newValue);
        prevElement.parentElement.appendChild(newElement);
        if (newValue > prevValue) {
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
        const prevValue = Number(prevElement.innerText);
        const newValue = invitation.start.time.minute;
        const newElement = document.createElement('p');
        newElement.classList.add('current-element');
        newElement.innerText = convertValueToString(newValue);
        prevElement.parentElement.appendChild(newElement);
        if (newValue > prevValue) {
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

    const getMinimumMinute = () => {
        if (invitation.start.day.isToday) {
            if (invitation.start.time.hour > followingWeek[0].time.hour) {
                return 0;
            } else {
                const minimumData = getTime(followingWeek[0], minimumDelay);
                return minimumData.time.minute;
            }
        } else {
            return 0;
        }
    };

    const getNewMinute = (math, currentMinuteValue) => {
        const minimumMinute = getMinimumMinute();
        if (math === 'plus') {
            if (currentMinuteValue < 60) {
                return currentMinuteValue + 1;
            } else {
                return minimumMinute;
            }
        } else {
            if (currentMinuteValue > minimumMinute) {
                return currentMinuteValue - 1;
            } else {
                return 60;
            }
        }
    };

    const updateMinuteClick = (math) => {
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

    const updateMinuteInterval = (e, math) => {
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
        }, 100);
        e.target.addEventListener('mouseup', () => clearInterval(interval));
    };

    const getMinimumHour = () => {
        if (invitation.start.day.isToday) {
            return followingWeek[0].time.hour;
        } else {
            return 0;
        }
    }

    const getNewHour = (math, currentHourValue) => {
        const minimumHour = getMinimumHour();
        if (math === 'plus') {
            if (currentHourValue < 24) {
                return currentHourValue + 1;
            } else {
                return minimumHour;
            }
        } else {
            if (currentHourValue > minimumHour) {
                return currentHourValue - 1;
            } else {
                return 24;
            }
        }
    };

    const updateHourInterval = (e, math) => {
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
        }, 100);
        e.target.addEventListener('mouseup', () => clearInterval(interval));
    };

    const updateHourClick = (math) => {
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
                    onClick={(e) => updateHourClick('plus')}
                    onMouseDown={(e) => updateHourInterval(e,'plus')}
                    className='plus-arrow'>
                </div>
                <div className='value-container'>
                    <p id='input-hour-id'>
                    </p>
                </div>
                <div
                    onClick={(e) => updateHourClick('minus')}
                    onMouseDown={(e) => updateHourInterval(e,'minus')}
                    className='minus-arrow'>
                </div>
            </div>
            <span className='colon'>:</span>
            <div className='minuets-container'>
                <div
                    onClick={(e) => updateMinuteClick('plus')}
                    onMouseDown={(e) => updateMinuteInterval(e,'plus')}
                    className='plus-arrow'>

                </div>
                <div className='value-container'>
                    <p id='input-minute-id'>
                    </p>
                </div>
                <div
                    onClick={(e) => updateMinuteClick('minus')}
                    onMouseDown={(e) => updateMinuteInterval(e,'minus')}
                    className='minus-arrow'>

                </div>
            </div>
        </div>
    )
};

export default InputTime;