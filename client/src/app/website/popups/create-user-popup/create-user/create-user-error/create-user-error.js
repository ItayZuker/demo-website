import React, { useContext, useEffect } from "react"
import { CreateUserContext } from "../../../../../../context/create-user-context"
import "./create-user-error.scss"

const CreateUserError = () => {
    /* Global Variables */
    const {
        setStage,
        setError,
        setMessage,
        setSubStage
    } = useContext(CreateUserContext)

    /* Triggers */
    useEffect(() => {
        setSubStage("legal")
        setMessage(prevState => {
            return {
                ...prevState,
                one: {
                    string: "Something went wrong",
                    highlight: true
                },
                two: {
                    string: "",
                    highlight: false
                }
            }
        })
    }, [])

    /* Functions */
    const tryAgain = () => {
        setStage("age-limit")
        setError(false)
    }

    /* JSX Output */
    return (
        <div className="create-user-error-container">
            <p onClick={() => tryAgain()}>Try again</p>
        </div>
    )
}

export default CreateUserError
