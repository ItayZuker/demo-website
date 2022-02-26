import React, {useContext, useEffect, useState} from "react";
import {CreateUserContext} from "../../../../context/create-user-context";
import InputPassword from './input-password/input-password';
import SubmitButton from "../../../../components/submit-button/submit-button";
import './create-user-stage-two.scss';

const CreateUserStageTwo = () => {

    /* Import global state variables */
    const {
        setStage,
        password,
        setPassword,
        email,
        setEmail,
        setMessage,
        stage,
    } = useContext(CreateUserContext);

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
        const passwordString = await getPassword();
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

    const getPassword = () => {
        return new Promise(resolve => {
            const passwordCharactersArray = password.array.map(item => {
                return item.character
            })
            const passwordString = passwordCharactersArray.join('');
            resolve(passwordString);
        });
    };

    const handleData = (data) => {
        setLoading(false);
        clearPasswordArray();
        setEmail({
            string: data.email,
            verified: data.match,
        });
        if(data.expired) {
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
        } else {
            setStage(data.stage);
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
        const password = await getPassword();
        const item = {
            email: email.string,
            password: password,
            date: new Date(),
        };
        try {
            const res = await fetch('/create-user/password-verification', {
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
            <div className='create-user-stage-two-container'>
                {passwordActive ?
                    <InputPassword
                        isActive={passwordActive}
                        loading={loading}/>
                    : <></> }
                {passwordActive ?
                    <SubmitButton
                        isActive={verifyActive}
                        value='Verify'
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

export default CreateUserStageTwo;