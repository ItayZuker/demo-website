import React, {useState} from "react";
const CreateUserContext = React.createContext();

const CreateUserContextComponent = (props) => {

    /* Local State */
    const [stage, setStage] = useState('email');
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
    const [legal, setLegal] = useState({
        content: 'appName will always be free, and all data stored is for optimization purpose only. ' +
            'We will never share your information with any third party. ' +
            'All conversations are permanently deleted when closing a chat, and appName will only have the last 10 messages while chat is active. ' +
            'Deleted messages can not be restored, and if you choose to share your personal information, you do that on your sole responsibility. ',
        agree: false,
    })

    /* Context Payload */
    const contextValue = {
        email,
        setEmail,
        stage,
        setStage,
        password,
        setPassword,
        message,
        setMessage,
        legal,
        setLegal,
        error,
        setError,
    };

    /* JSX Output */
    return (
        <CreateUserContext.Provider value={ contextValue }>
            { props.children }
        </CreateUserContext.Provider>
    )
}

export { CreateUserContext, CreateUserContextComponent }
