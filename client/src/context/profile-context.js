import React, {useState} from "react";
const ProfileContext = React.createContext();

const ProfileContextComponent = (props) => {

    /* Local State */
    const [tab, setTab] = useState('email');
    const [details, setDetails] = useState({});
    const [countries, setCountries] = useState([]);
    const [enLetters] = useState(['a', 'A', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J', 'k', 'K', 'l', 'L', 'm', 'M', 'n', 'N', 'o', 'O', 'p', 'P', 'q', 'r', 'R', 's', 'S', 't', 'T', 'u', 'U', 'v', 'V', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z']);
    const [globals, setGlobals] = useState({
        gender: [],
    });

    /* Context Payload */
    const contextValue = {
        tab,
        setTab,
        details,
        setDetails,
        countries,
        setCountries,
        enLetters,
        globals,
        setGlobals,
    };

    /* JSX Output */
    return (
        <ProfileContext.Provider value={ contextValue }>
            { props.children }
        </ProfileContext.Provider>
    )
}

export { ProfileContext, ProfileContextComponent }
