import React, {useEffect} from "react";
import "./invitation-error.scss";

const InvitationError = (props) => {


    useEffect(() => {
        resetComponent()
    }, [])

    const resetComponent = () => {
        setTimeout(() => {
            props.setError(false)
        }, 3000)
    }

    return (
        <div className="invitation-error-container">
            <p>Sorry, something went wrong :(</p>
        </div>
    )
}

export default InvitationError