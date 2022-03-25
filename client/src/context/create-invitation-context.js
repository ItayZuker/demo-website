import React, {useEffect, useState} from "react";
const CreateInvitationContext = React.createContext();

const CreateInvitationContextComponent = (props) => {

    /* Local State */
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
    const [nextWeek, setNextWeek] = useState([]);
    const [invitation, setInvitation] = useState({
        type: '',
        day: {
            isToday: Boolean,
            index: null,
            month: {},
            day: {},
            date: {}
        },
        start: {
            minuet: null,
            hour: null,
            ampm: 'am'
        }
    });

    useEffect(async () => {
        await updateDays();
    }, []);

    useEffect(() => {
        if (nextWeek.length === 7) {
            selectToday(nextWeek);
        }
    }, [nextWeek]);

    const getTodayData = () => {
        return new Promise(resolve => {
            const today = new Date();
            const dd = Number(String(today.getDate()).padStart(2, '0'));
            const mm = Number(String(today.getMonth() + 1).padStart(2, '0'));
            const yyyy = today.getFullYear();
            const daysInMonth = new Date(yyyy, mm, 0).getDate();
            resolve({month: mm ,  day: dd, year: yyyy, daysInMonth: daysInMonth});
        });
    };

    const getDayItem = (date, todayData) => {
        return new Promise(resolve => {
            const day = new Date(date);
            const metricDayOfMonth = Number(String(day.getDate()).padStart(2, '0'));
            const metricDayOfWeek = day.getDay();
            const metricMonth = Number(String(day.getMonth() + 1).padStart(2, '0'));
            const metricYear = day.getFullYear();
            const isToday = todayData.day === metricDayOfMonth && todayData.month === metricMonth && todayData.year === metricYear;
            const dayItem = {
                isToday: isToday,
                index: metricDayOfWeek,
                month: monthList[metricMonth - 1],
                day: daysList[metricDayOfWeek],
                date: {
                    mm: metricMonth,
                    dd: metricDayOfMonth,
                    yyyy: metricYear
                }
            }
            resolve(dayItem);
        });
    };

    const selectToday = async (nextWeek) => {
        const today = await nextWeek.find(day => day.isToday);
        setInvitation(prevState => {
            return {...prevState, day: today};
        });
    };

    const updateDays = async () => {
        let array = [];
        const todayData = await getTodayData();
        for (let i = 0; i < 7; i++) {
            const day = todayData.day + i;
            if (day > todayData.daysInMonth) {
                if (todayData.month === 12) {
                    const metricYear = todayData.year + 1;
                    const metricDay = day - todayData.daysInMonth;
                    const metricMonth = 1;
                    const date = `${metricMonth}/${metricDay}/${metricYear}`;
                    const dayItem = await getDayItem(date, todayData);
                    array[dayItem.index] = dayItem;
                } else {
                    const metricYear = todayData.year;
                    const metricDay = day - todayData.daysInMonth;
                    const metricMonth = todayData.month;
                    const date = `${metricMonth}/${metricDay}/${metricYear}`;
                    const dayItem = await getDayItem(date, todayData);
                    array[dayItem.index] = dayItem;
                }
            } else {
                const metricYear = todayData.year;
                const metricDay = day;
                const metricMonth = todayData.month;
                const date = `${metricMonth}/${metricDay}/${metricYear}`;
                const dayItem = await getDayItem(date, todayData);
                array[dayItem.index] = dayItem;
            }
        }
        setNextWeek(array);
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
        setInvitation,
        nextWeek,
    };

    /* JSX Output */
    return (
        <CreateInvitationContext.Provider value={ contextValue }>
            { props.children }
        </CreateInvitationContext.Provider>
    )
}

export { CreateInvitationContext, CreateInvitationContextComponent }
