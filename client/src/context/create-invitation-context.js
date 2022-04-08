import React, {useEffect, useState} from "react";
const CreateInvitationContext = React.createContext();

const CreateInvitationContextComponent = (props) => {

    /* Local State */
    const [minimumDelay] = useState(5);
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
            short: 'sun'
        },
        {
            name: 'monday',
            short: 'mon'
        },
        {
            name: 'tuesday',
            short: 'tue'
        },
        {
            name: 'wednesday',
            short: 'wed'
        },
        {
            name: 'thursday',
            short: 'thu'
        },
        {
            name: 'friday',
            short: 'fri'
        },
        {
            name: 'saturday',
            short: 'sat'
        }
    ]);
    const [stage, setStage] = useState('');
    const [title, setTitle] = useState('');
    const [error, setError] = useState(false);
    const [message, setMessage] = useState({
        one: {
            string: '',
            highlight: false
        },
        two: {
            string: '',
            highlight: false
        }
    });
    const [invitation, setInvitation] = useState({
        type: '',
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

    useEffect(() => {
        if (invitation.duration.set) {
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
            tryUpdateInvitation(followingWeek[0]);
        }
    }, [followingWeek]);

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
        date.setDate(date.getDate() + 1);
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
        date.setDate(date.getDate() + 1);
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
        date.setDate(date.getDate() + 1);
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
        } else if (start.month.isLastInYear) {
            if (start.day.isLastInMonth) {
                return getUpdateDayHourMinute(start, delay);
            } else {
                return getUpdateMonthDayHourMinute(start, delay);
            }
        } else {
            return getUpdateYearMonthDayHourMinute(start, delay);
        }
    }

    const updateInvitationEnd = (duration) => {
        if (duration.unlimited) {
            setInvitation(prevState => {
                return {...prevState,
                    end: {
                        set: true,
                        unlimited: true,
                    }
                }
            })
        } else {
            const invitationEnd = getTime(followingWeek[0], duration.metric);
            setInvitation(prevState => {
                return {...prevState,
                    end: invitationEnd,
                };
            });
        }
    };

    const updateInvitationToMinimumStart = (start) => {
        const invitationStart = getTime(start, minimumDelay)
        setInvitation(prevState => {
            return {...prevState,
                start: invitationStart,
            };
        });
    }

    const tryUpdateInvitation = async (today) => {
        if (invitation.start.set) {
            const
                year_1 = today.year.metric,
                month_1 = today.month.metricInYear,
                day_1 = today.day.metricDayInTheMonth,
                hour_1 = today.time.hour,
                minute_1 = today.time.minute
            const
                year_2 = invitation.start.year.metric,
                month_2 = invitation.start.month.metricInYear,
                day_2 = invitation.start.day.metricDayInTheMonth,
                hour_2 = invitation.start.time.hour,
                minute_2 = invitation.start.time.minute
            const minimumDate = (new Date(year_1, month_1, day_1, hour_1, minute_1)).getTime();
            const selectedDate = (new Date(year_2, month_2, day_2, hour_2, minute_2)).getTime();
            const diffInMinutes = ((selectedDate - minimumDate) / 1000) / 60;
            if (diffInMinutes < minimumDelay) {
                updateInvitationToMinimumStart(today);
            }
        } else {
            updateInvitationToMinimumStart(today);
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
        <CreateInvitationContext.Provider value={ contextValue }>
            { props.children }
        </CreateInvitationContext.Provider>
    )
}

export { CreateInvitationContext, CreateInvitationContextComponent }
