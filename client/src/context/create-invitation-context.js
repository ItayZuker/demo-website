import React, {useEffect, useState} from "react";
const CreateInvitationContext = React.createContext();

const CreateInvitationContextComponent = (props) => {

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
        type: "",
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
        if (invitation.start.set && invitation.duration.set) {
            updateInvitationEnd(invitation.duration);
        }
    }, [invitation.start, invitation.duration]);

    /* Functions */

    const getTimeStamp = (date, delay) => {
        const year = date.year.metric;
        const monthIndex = date.month.metricInYear - 1;
        const day = date.day.metricDayInTheMonth;
        const hours = date.time.hour;
        const minutes = date.time.minute;
        const currentDate = new Date(year, monthIndex, day, hours, minutes);
        return {
            timeSet: true,
            timeStamp: new Date(currentDate.getTime() + delay*60000),
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
            const invitationEndTimeStamp = new Date(invitation.start.timeStamp.getTime() + duration.metric*60000);
            setInvitation(prevState => {
                return {...prevState,
                    end: {
                        set: true,
                        unlimited: false,
                        timeStamp: invitationEndTimeStamp
                    }
                };
            });
        }
    };

    const getDayData = (metric) => {
        /* metric === 0 means today, metric === 1 means tomorrow ext. */
        return new Promise(resolve => {
            const today = new Date();
            const date = new Date(today)
            date.setDate(date.getDate() + metric)
            const year = date.getFullYear();
            const monthIndex = date.getMonth();
            const day = date.getDate();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const currentDate = new Date(year, monthIndex, day, hours, minutes);
            resolve(currentDate);
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
        getTimeStamp,
    };

    /* JSX Output */
    return (
        <CreateInvitationContext.Provider value={ contextValue }>
            { props.children }
        </CreateInvitationContext.Provider>
    )
}

export { CreateInvitationContext, CreateInvitationContextComponent }
