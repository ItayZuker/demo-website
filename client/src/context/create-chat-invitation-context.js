import React, {useEffect, useState} from "react";
const CreateChatInvitationContext = React.createContext();

const CreateChatInvitationContextComponent = (props) => {

    /* Local State */
    const [minimumDelay] = useState(0);
    const [followingWeek, setFollowingWeek] = useState([]);
    const [monthList] = useState([
        {
            name: 'january',
            short: 'jan'
        }, {
            name: 'february',
            short: 'feb',
        }, {
            name: 'march',
            short: 'mar'
        }, {
            name: 'april',
            short: 'apr'
        }, {
            name: 'may',
            short: 'may'
        }, {
            name: 'june',
            short: 'jun'
        }, {
            name: 'july',
            short: 'jul'
        }, {
            name: 'august',
            short: 'aug'
        }, {
            name: 'september',
            short: 'sep'
        }, {
            name: 'october',
            short: 'oct'
        }, {
            name: 'november',
            short: 'nov'
        }, {
            name: 'december',
            short: 'dec'
    }])
    const [daysList] = useState([
        {
            name: 'sunday',
            short: 'su',
        },
        {
            name: 'monday',
            short: 'mo',
        },
        {
            name: 'tuesday',
            short: 'tu'
        },
        {
            name: 'wednesday',
            short: 'we'
        },
        {
            name: 'thursday',
            short: 'th'
        },
        {
            name: 'friday',
            short: 'fr'
        },
        {
            name: 'saturday',
            short: 'sa'
        }
    ]);
    const [stage, setStage] = useState('');
    const [title, setTitle] = useState('');
    const [error, setError] = useState(false);
    const [message, setMessage] = useState({
        string: '',
        highlight: false,
    });
    const [invitation, setInvitation] = useState({
        type: 'chat',
        start: {
            set: false,
        },
        end: {
            set: false,
        },
        duration: {
            set: false,
        },
    });

    /* Triggers */
    useEffect(() => {
        if (invitation.duration.set && invitation.start.set) {
            updateInvitationEnd(invitation.duration);
        }
    }, [invitation.duration]);

    useEffect(() => {
        updateFollowingWeek();
        let followingWeekInterval = setInterval(() => {
            updateFollowingWeek();
        }, 1000);
        return () => {
            clearInterval(followingWeekInterval);
        }
    }, []);

    useEffect(() => {
        if (!!followingWeek.length) {
            // tryUpdateInvitation(followingWeek[0]);
        }
    }, [followingWeek]);

    useEffect(() => {
        if (invitation.start.set && invitation.duration.set) {
            updateInvitationEnd(invitation.duration);
        }
    }, [invitation.start, invitation.duration]);

    /* Functions */
    const getUpdateMinutes = (start, delay) => {
        return {
            set: true,
            timeZone: {
                continent: start.timeZone.continent,
                city: start.timeZone.city,
                metricUTCMinuteOffset: start.timeZone.metricUTCMinuteOffset,
            },
            year: start.year,
            month: start.month,
            day: start.day,
            time: {
                hour: start.time.hour,
                minute: start.time.minute + delay
            }
        }
    };

    const getUpdateHourMinutes = (start, delay) => {
        return {
            set: true,
            timeZone: {
                continent: start.timeZone.continent,
                city: start.timeZone.city,
                metricUTCMinuteOffset: start.timeZone.metricUTCMinuteOffset,
            },
            year: start.year,
            month: start.month,
            day: start.day,
            time: {
                hour: start.time.hour + 1,
                minute: delay - (60 - start.time.minute),
            },
        }
    }

    const getUpdateDayHourMinute = (start, delay) => {
        const today = new Date();
        const date = new Date(today);
        date.setDate(start.day.metricDayInTheMonth + 1);
        return {
            set: true,
            timeZone: {
                continent: start.timeZone.continent,
                city: start.timeZone.city,
                metricUTCMinuteOffset: start.timeZone.metricUTCMinuteOffset,
            },
            year: start.year,
            month: start.month,
            day: {
                name: daysList[date.getDay()].name,
                short: daysList[date.getDay()].short,
                metricDayInTheMonth: date.getDate(),
                metricDayInTheWeek: date.getDay() + 1,
                isToday: false,
                isLastInMonth: date.getDate() === new Date(date.getFullYear(), (date.getMonth() + 1), 0).getDate(),
                isLastInWeek: (date.getDay() + 1) === 7,
            },
            time: {
                hour: 0,
                minute: delay - (60 - start.time.minute),
            }
        }
    }

    const getUpdateMonthDayHourMinute = (start, delay) => {
        const today = new Date();
        const date = new Date(today);
        date.setDate(start.day.metricDayInTheMonth + 1);
        return {
            set: true,
            timeZone: {
                continent: start.timeZone.continent,
                city: start.timeZone.city,
                metricUTCMinuteOffset: start.timeZone.metricUTCMinuteOffset,
            },
            year: start.year,
            month: {
                name: monthList[date.getMonth()].name,
                short: monthList[date.getMonth()].short,
                metricInYear: date.getMonth() + 1,
                metricTotalInMonth: new Date(date.getFullYear(), (date.getMonth() + 1), 0).getDate(),
                isLastInYear: (date.getMonth() + 1) === 12,
            },
            day: {
                name: daysList[date.getDay()].name,
                short: daysList[date.getDay()].short,
                metricDayInTheMonth: date.getDate(),
                metricDayInTheWeek: date.getDay() + 1,
                isToday: false,
                isLastInMonth: date.getDate() === new Date(date.getFullYear(), (date.getMonth() + 1), 0).getDate(),
                isLastInWeek: (date.getDay() + 1) === 7,
            },
            time: {
                hour: 0,
                minute: delay - (60 - start.time.minute),
            }
        };
    };

    const getUpdateYearMonthDayHourMinute = (start, delay) => {
        const today = new Date();
        const date = new Date(today);
        date.setDate(start.day.metricDayInTheMonth + 1);
        return {
            set: true,
            timeZone: {
                continent: start.timeZone.continent,
                city: start.timeZone.city,
                metricUTCMinuteOffset: start.timeZone.metricUTCMinuteOffset,
            },
            year: start.year.metric + 1,
            month: {
                name: monthList[date.getMonth()].name,
                short: monthList[date.getMonth()].short,
                metricInYear: date.getMonth() + 1,
                metricTotalInMonth: new Date(date.getFullYear(), (date.getMonth() + 1), 0).getDate(),
                isLastInYear: (date.getMonth() + 1) === 12,
            },
            day: {
                name: daysList[date.getDay()].name,
                short: daysList[date.getDay()].short,
                metricDayInTheMonth: date.getDate(),
                metricDayInTheWeek: date.getDay() + 1,
                isToday: false,
                isLastInMonth: date.getDate() === new Date(date.getFullYear(), (date.getMonth() + 1), 0).getDate(),
                isLastInWeek: (date.getDay() + 1) === 7,
            },
            time: {
                hour: 0,
                minute: delay - (60 - start.time.minute),
            }
        };
    }

    const getTime = (start, delay) => {
        if (start.time.minute + delay < 60) {
            return getUpdateMinutes(start, delay);
        } else if (start.time.hour < 23) {
            return getUpdateHourMinutes(start, delay);
        } else if (!start.month.isLastInYear) {
            if (!start.day.isLastInMonth) {
                return getUpdateDayHourMinute(start, delay);
            } else {
                return getUpdateMonthDayHourMinute(start, delay);
            }
        } else {
            return getUpdateYearMonthDayHourMinute(start, delay);
        }
    };

    const updateInvitationEnd = (duration) => {
        if (duration.unlimited) {
            setInvitation(prevState => {
                return {...prevState,
                    end: {
                        set: true,
                        unlimited: true,
                    },
                };
            });
        } else {

            const invitationEnd = getTime(invitation.start, duration.metric);
            // console.log(invitationEnd)
            setInvitation(prevState => {
                return {...prevState,
                    end: invitationEnd,
                };
            });
        }
    };

    const getTimeZone = () => {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const continent = timezone.split("/")[0];
        const city = timezone.split("/")[1];
        return {
            continent: continent,
            city: city,
        };
    };

    const getDayData = (metric) => {
        /* metric === 0 means today, metric === 1 means tomorrow ext. */
        return new Promise(resolve => {
            const timeZone = getTimeZone();
            const today = new Date();
            const date = new Date(today)
            date.setDate(date.getDate() + metric)
            const metricYear = date.getFullYear();
            const stringMonth = monthList[date.getMonth()];
            const stringDay = daysList[date.getDay()];
            const metricDayInTheMonth = date.getDate();
            const metricTotalInMonth = new Date(date.getFullYear(), (date.getMonth() + 1), 0).getDate();
            const metricHour = date.getHours();
            const metricMinute = date.getMinutes();
            const metricUTCMinuteOffset = date.getTimezoneOffset();
            if (metric > 0) {
                resolve({
                    timeZone: {
                        continent: timeZone.continent,
                        city: timeZone.city,
                        metricUTCMinuteOffset: metricUTCMinuteOffset,
                    },
                    year: {
                        metric: metricYear,
                    },
                    month: {
                        name: stringMonth.name,
                        short: stringMonth.short,
                        metricInYear: date.getMonth() + 1,
                        metricTotalInMonth: metricTotalInMonth,
                        isLastInYear: (date.getMonth() + 1) === 12,
                    },
                    day: {
                        name: stringDay.name,
                        short: stringDay.short,
                        metricDayInTheMonth: metricDayInTheMonth,
                        metricDayInTheWeek: date.getDay() + 1,
                        isToday: false,
                        isLastInMonth: metricDayInTheMonth === metricTotalInMonth,
                        isLastInWeek: (date.getDay() + 1) === 7,
                    },
                });
            } else {
                resolve({
                    timeZone: {
                        continent: timeZone.continent,
                        city: timeZone.city,
                        metricUTCMinuteOffset: metricUTCMinuteOffset,
                    },
                    year: {
                        metric: metricYear,
                    },
                    month: {
                        name: stringMonth.name,
                        short: stringMonth.short,
                        metricInYear: date.getMonth() + 1,
                        metricTotalInMonth: metricTotalInMonth,
                        isLastInYear: (date.getMonth() + 1) === 12,
                    },
                    day: {
                        name: stringDay.name,
                        short: stringDay.short,
                        metricDayInTheMonth: metricDayInTheMonth,
                        metricDayInTheWeek: date.getDay() + 1,
                        isToday: true,
                        isLastInMonth: metricDayInTheMonth === metricTotalInMonth,
                        isLastInWeek: (date.getDay() + 1) === 7,
                    },
                    time: {
                        hour: metricHour,
                        minute: metricMinute,
                    },
                });
            }
        });
    };

    const getFullWeekData = async () => {
        let followingWeek = [];
        for (let day = 0; day < 7; day++) {
            const dayData = await getDayData(day);
            followingWeek.push(dayData);
        }
        return followingWeek;
    };

    const updateFollowingWeek = async () => {
        const followingWeekData = await getFullWeekData();
        setFollowingWeek(followingWeekData);
    };

    /* Context Payload */
    const contextValue = {
        stage,
        setStage,
        title,
        setTitle,
        message,
        setMessage,
        error,
        setError,
        invitation,
        minimumDelay,
        followingWeek,
        setInvitation,
        monthList,
        daysList,
        getTime,
    };

    /* JSX Output */
    return (
        <CreateChatInvitationContext.Provider value={ contextValue }>
            { props.children }
        </CreateChatInvitationContext.Provider>
    )
}

export { CreateChatInvitationContext, CreateChatInvitationContextComponent }
