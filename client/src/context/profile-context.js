import React, {useState} from "react";
const ProfileContext = React.createContext();

const ProfileContextComponent = (props) => {

    /* Local State */
    const [tab, setTab] = useState('');
    // const [details, setDetails] = useState({});
    // const [countries, setCountries] = useState([]);
    const [enLetters] = useState(['a', 'A', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J', 'k', 'K', 'l', 'L', 'm', 'M', 'n', 'N', 'o', 'O', 'p', 'P', 'q', 'r', 'R', 's', 'S', 't', 'T', 'u', 'U', 'v', 'V', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z']);
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

    /* Context Payload */
    const contextValue = {
        tab,
        setTab,
        enLetters,
        monthList,
        daysList
    };

    /* JSX Output */
    return (
        <ProfileContext.Provider value={ contextValue }>
            { props.children }
        </ProfileContext.Provider>
    )
}

export { ProfileContext, ProfileContextComponent }
