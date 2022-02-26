import React, {useState} from "react";
const ProfileContext = React.createContext();

const ProfileContextComponent = (props) => {

    /* Local State */
    const [tab, setTab] = useState('email');


    /* Context Payload */
    const contextValue = {
        tab,
        setTab,
    };

    /* JSX Output */
    return (
        <ProfileContext.Provider value={ contextValue }>
            { props.children }
        </ProfileContext.Provider>
    )
}

export { ProfileContext, ProfileContextComponent }
