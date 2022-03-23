import React, {useEffect, useState} from "react";
const CreateInvitationContext = React.createContext();

const CreateInvitationContextComponent = (props) => {

    /* Local State */
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
    const [typeChatInfo] = useState('Small info box with explanation about type chat invitation, and a little more text inside');
    const [typeEventInfo] = useState('Small info box with explanation about type event invitation, and a little more text inside');

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
        typeChatInfo,
        typeEventInfo
    };

    /* JSX Output */
    return (
        <CreateInvitationContext.Provider value={ contextValue }>
            { props.children }
        </CreateInvitationContext.Provider>
    )
}

export { CreateInvitationContext, CreateInvitationContextComponent }
