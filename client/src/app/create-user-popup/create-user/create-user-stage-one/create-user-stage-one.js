import React, {useContext, useEffect, useState} from "react";
import {CreateUserContext} from "../../../../context/create-user-context";
import EmailInput from './input-email/input-email';
import SubmitButton from "../../../../components/submit-button/submit-button";
import './create-user-stage-one.scss';

const CreateUserStageOne = () => {

    /* Import global state variables */
    const {
        email,
        setPassword,
        setStage,
        setMessage,
        stage,
    } = useContext(CreateUserContext);

    /* Locale state variables */
    const [loading, setLoading] = useState(false);

    /* Variable triggers */
    useEffect(() => {
        setMessage({
            one: {
                string: 'Please verify your email:',
                highlight: false
            },
            two: {
                string: '',
                highlight: false
            }});
    }, []);

    /* Component functions */
    const getMinutesLifetime = (seconds) => {
        return new Promise(resolve => {
            const minutes = Math.floor(seconds / 60000);
            resolve(minutes);
        });
    };

    const handleData = async (data) => {
        setLoading(false);
        if(data.passwordSent) {
            setPassword(prevState => {
                return {...prevState, size: data.passwordSize, lifetime: data.passwordLifetime}
            });
        }
        if(data.stage === 'password') {
            const minutes = await getMinutesLifetime(data.passwordLifetime);
            setMessage(prevState => {
                return {...prevState,
                    one: {
                        string: data.message,
                        highlight: false,
                    },
                    two: {
                        string: '(Valid for ' + minutes + ' minutes)',
                        highlight: false,
                    }}
            });
        } else if(data.registered) {
            setMessage(prevState => {
                return {...prevState,
                    one: {
                        string: 'Email is already registered',
                        highlight: true,
                    },
                    two: {
                        string: 'Go to login page',
                        highlight: true,
                    }}
            });
            setTimeout(() => {
                resetMessage();
            }, 5000)
        }
        setStage(data.stage);
    };

    const sendCode = async () => {
        setLoading(true);
        try {
            const res = await fetch('/create-user/email-verification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.string,
                }),
            });
            const data = await res.json();
            handleData(data);
        } catch ( err ) {
            console.log(err);
            setLoading(false);
        }
    };

    const resetMessage = () => {
        setMessage({
            one: {
                string: 'Please enter your email:',
                highlight: false
            },
            two: {
                string: '',
                highlight: false
            }});
    };

    /* JSX output */
    if (stage !== 'email') {
        return <></>
    } else {
        return (
            <div className='create-user-stage-one-container'>
                <EmailInput
                    isActive={true}
                    placeholder='example@email.com'
                    loading={loading}
                    focusCallback={resetMessage}/>
                <SubmitButton
                    isActive={!!email.string}
                    value='Send password'
                    callback={() => sendCode()}
                    loading={loading}/>
            </div>
        )
    }
}

export default CreateUserStageOne;