import React, {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../../../../../context/login-context";
import EmailInput from './input-email/input-email';
import SubmitButton from "../../../../../../components/submit-button/submit-button";
import './login-stage-one.scss';

const LoginStageOne = () => {

    /* Import global state variables */
    const {
        email,
        setPassword,
        setStage,
        setMessage,
        stage,
    } = useContext(LoginContext);

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
        if(data.passwordSent) {
            setPassword(prevState => {
                return {...prevState, size: data.passwordSize, lifetime: data.passwordLifetime}
            });
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
        } else {
            setMessage(prevState => {
                return {...prevState,
                    one: {
                        string: data.message,
                        highlight: true,
                    },
                    two: {
                        string: '',
                        highlight: false,
                    }}
            });
            setTimeout(() => {
                resetMessage();
            }, 5000);
        }
        setLoading(false);
        setStage(data.stage);
    };

    const sendCode = async () => {
        setLoading(true);
        const item = {
            email: email.string,
            data: new Date(),
        };
        try {
            const res = await fetch('/login/email-verification', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: item.email,
                    date: item.date,
                }),
            });
            const data = await res.json();
            console.log(data);
            handleData(data);
        } catch ( err ) {
            console.log(err);
            setLoading(false);
        }
    };

    const resetMessage = () => {
        setMessage({
            one: {
                string: 'Please verify your email:',
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
            <div className='login-stage-one-container'>
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

export default LoginStageOne;