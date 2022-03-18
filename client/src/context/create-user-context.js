import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "./global-context";
const CreateUserContext = React.createContext();

const CreateUserContextComponent = (props) => {

    /* Global Variables */
    const {
        geoData,
    } = useContext(GlobalContext);

    /* Local Variables */
    const [yearList, setYearList] = useState([]);
    const [monthList] = useState(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'])
    const [today, satToday] = useState({});
    const [title, setTitle] = useState('');
    const [stage, setStage] = useState('age-limit');
    const [subStage, setSubStage] = useState('legal');
    const [error, setError] = useState(false);
    const [password, setPassword] = useState({
        array: [],
        size: null,
        lifetime: null,
    });
    const [email, setEmail] = useState({
        string: '',
        verified: false,
    });
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
    const [birthday, setBirthday] = useState({
        confirmation: {
            age: null,
            limit: null,
            isLegal: false,
        },
        month: {
            string: '',
            short: '',
            decimal: null,
        },
        day: {
            string: '',
            short: '',
            decimal: null,
        },
        year: {
            decimal: null,
        }
    })
    const [legal, setLegal] = useState({
        content: 'appName will always be free, and all data stored is for optimization purpose only. ' +
            'We will never share your information with any third party. ' +
            'All conversations are permanently deleted when closing a chat, and appName will only have the last 10 messages while chat is active. ' +
            'Deleted messages can not be restored, and if you choose to share your personal information, you do that on your sole responsibility. ',
        agree: false,
    })

    useEffect(() => {
        if (!!today.year) {
            updateYearList(today.year - geoData.ageLimit);
        }
    }, [today]);

    useEffect(() => {
        updateToday();
        updateAgeLimit();
    }, []);

    const updateAgeLimit = () => {
        setBirthday(prevState => {
            return {...prevState,
                confirmation: {...prevState.confirmation,
                    limit: geoData.ageLimit
            }};
        });
    };

    const updateYearList = (minimumYear) => {
        let array = [];
        const limit = minimumYear + geoData.ageLimit - 120;
        for (let year = minimumYear; year >= limit; year--) {
            const yearString = String(year)
            array.push(yearString);
        }
        setYearList(array);
    };

    const updateToday = async () => {
        const date = new Date();
        satToday({
            month: date.getMonth(),
            day:date.getDate(),
            year: date.getFullYear(),
        })
    };

    /* Context Payload */
    const contextValue = {
        email,
        setEmail,
        stage,
        setStage,
        subStage,
        setSubStage,
        password,
        setPassword,
        message,
        setMessage,
        legal,
        setLegal,
        error,
        setError,
        title,
        setTitle,
        birthday,
        setBirthday,
        monthList,
        today,
        yearList
    };

    /* JSX Output */
    return (
        <CreateUserContext.Provider value={ contextValue }>
            { props.children }
        </CreateUserContext.Provider>
    )
}

export { CreateUserContext, CreateUserContextComponent }
