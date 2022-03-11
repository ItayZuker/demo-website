import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../../../../context/global-context";
import {LoginContext} from "../../../../../../context/login-context";
import InputPassword from './input-password/input-password';
import SubmitButton from "../../../../../../components/submit-button/submit-button";
import './login-stage-two.scss';

const LoginStageTwo = () => {

    /* Import global state variables */
    const {
        setLogin,
        setPopup,
    } = useContext(GlobalContext);

    const {
        setStage,
        password,
        setPassword,
        email,
        setMessage,
        stage,
    } = useContext(LoginContext);

    /* Locale state variables */
    const [verifyActive, setVerifyActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [passwordActive, setPasswordActive] = useState(true);

    /* Variable triggers */
    useEffect(() => {
        if(!!password.array) {
            checkForPasswordString();
        }
    }, [password.array]);

    /* Component functions */
    const checkForPasswordString = async () => {
        const passwordString = await getPasswordString();
        if(passwordString.length === password.array.length) {
            setVerifyActive(true);
        } else {
            setVerifyActive(false);
        }
    }

    const getCleanPasswordArray = () => {
        return new Promise(resolve => {
            const cleanPasswordArray = password.array.map((item, i) => {
                return {character: '', index: i};
            });
            resolve(cleanPasswordArray);
        });
    };

    const clearPasswordArray = async () => {
        const cleanPasswordArray = await getCleanPasswordArray();
        setPassword(prevState => {
            return {...prevState, array: cleanPasswordArray}
        });
    };

    const backStageOne = () => {
        clearPasswordArray();
        setStage('email');
    };

    const getPasswordString = () => {
        return new Promise(resolve => {
            const passwordCharactersArray = password.array.map(item => {
                return item.character
            })
            const passwordString = passwordCharactersArray.join('');
            resolve(passwordString);
        });
    };

    const handleData = (data) => {
        console.log(data)
        clearPasswordArray();
        if(data.token) {
            localStorage.setItem('token', data.token);
            setLogin(true);
            setTimeout(() => {
                setLoading(false);
                setPopup('');
                window.location = '/book';
            }, 100);
        } else if(data.expired) {
            setLoading(false);
            setPasswordActive(false);
            setMessage(prevState => {
                return {...prevState,
                    one: {
                        string: 'Sorry, password expired',
                        highlight: true,
                    },
                    two: {
                        string: '',
                        highlight: false,
                    }}
            });
        } else if(!data.match) {
            setMessage(prevState => {
                return {...prevState,
                    one: {
                        string: 'Wrong Password, try again',
                        highlight: true,
                    }}
            });
            setTimeout(() => {
                resetMessage();
            }, 3000);
            setLoading(false);
        } else {
            setPasswordActive(false);
            setMessage(prevState => {
                return {...prevState,
                    one: {
                        string: 'Sorry, something went wrong',
                        highlight: true,
                    },
                    two: {
                        string: '',
                        highlight: false,
                    }}
            });
            setLoading(false);
        }
    };

    const resetMessage = () => {
        setMessage(prevState => {
            return {...prevState,
                one: {
                    string: 'Password was sent to your email',
                    highlight: false,
                }}
        });
    };

    const verifyCode = async () => {
        setLoading(true);
        const passwordString = await getPasswordString();
        const item = {
            email: email.string,
            password: passwordString,
            date: new Date(),
        };
        try {
            const res = await fetch('/login/password-verification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: item.email,
                    password: item.password,
                }),
            });
            const data = await res.json();
            handleData(data);
        } catch ( err ) {
            console.log(err);
            setLoading(false);
        }
    };

    /* JSX output */
    if (stage !== 'password') {
        return <></>
    } else {
        return (
            <div className='login-stage-two-container'>
                {passwordActive ?
                    <InputPassword
                        isActive={passwordActive}
                        loading={loading}/>
                    : <></> }
                {passwordActive ?
                    <SubmitButton
                        isActive={verifyActive}
                        value='verify'
                        callback={() => verifyCode()}
                        loading={loading}/>
                    : <></> }
                <p className={passwordActive ? '' : 'password-expired'}
                    onClick={() => backStageOne()}>
                    Send another password</p>
            </div>
        )
    }
}

export default LoginStageTwo;