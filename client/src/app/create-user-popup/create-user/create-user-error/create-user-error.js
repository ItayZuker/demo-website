import React, {useContext, useEffect} from "react";
import {CreateUserContext} from "../../../../context/create-user-context";
import "./create-user-error.scss";

const CreateUserError = () => {

    /* Import Global Variables */
    const {
        setStage,
        setError,
        setMessage,
    } = useContext(CreateUserContext);

    useEffect(() => {
        setMessage(prevState => {
            return {...prevState,
                one: {
                    string: 'Something went wrong',
                    highlight: true,
                },
                two: {
                    string: '',
                    highlight: false,
                }}
        });
    }, [])

    /* Component Functions */
    const tryAgain = () =>{
        setStage('email');
        setError(false);
    };

    return (
        <div className='create-user-error-container'>
            <p onClick={() => tryAgain()}>Try again</p>
        </div>
    )
};

export default CreateUserError;