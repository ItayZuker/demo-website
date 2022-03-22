import React, {useState} from "react";
const CreateInvitationContext = React.createContext();

const CreateInvitationContextComponent = (props) => {

    /* Local State */
    const [stage, setStage] = useState('new');
    const [title, setTitle] = useState('');

    /* Context Payload */
    const contextValue = {
        stage,
        setStage,
        title,
        setTitle,
    };

    /* JSX Output */
    return (
        <CreateInvitationContext.Provider value={ contextValue }>
            { props.children }
        </CreateInvitationContext.Provider>
    )
}

export { CreateInvitationContext, CreateInvitationContextComponent }
