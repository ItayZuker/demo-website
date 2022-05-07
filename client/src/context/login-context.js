import React, { useState } from "react"
const LoginContext = React.createContext()

const LoginContextComponent = (props) => {
    /* Locale Variables */
    const [stage, setStage] = useState("email")
    const [password, setPassword] = useState({
        array: [],
        size: null,
        lifetime: null
    })
    const [email, setEmail] = useState({
        string: "",
        verified: false
    })
    const [message, setMessage] = useState({
        one: {
            string: "",
            highlight: false
        },
        two: {
            string: "",
            highlight: false
        }
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
        setMessage
    }

    /* JSX Output */
    return (
        <LoginContext.Provider value={ contextValue }>
            { props.children }
        </LoginContext.Provider>
    )
}

export { LoginContext, LoginContextComponent }
