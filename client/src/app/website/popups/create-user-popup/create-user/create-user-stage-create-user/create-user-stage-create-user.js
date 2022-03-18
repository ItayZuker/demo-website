import React, {useState, useContext, useRef, useEffect} from "react";
import {CreateUserContext} from "../../../../../../context/create-user-context";
import {GlobalContext} from "../../../../../../context/global-context";
import SubmitButton from "../../../../../../components/submit-button/submit-button";
import CheckBox from "../../../../../../components/check-box/check-box";
import './create-user-stage-create-user.scss';

const CreateUserStageCreateUser = () => {

    /* Import global state variables */
    const {
        legal,
        setLegal,
        email,
        setMessage,
        stage,
        setError,
        birthday,
    } = useContext(CreateUserContext);

    const {
        geoData,
        setPopup,
        setLogin,
    } = useContext(GlobalContext);

    const [loading, setLoading] = useState(false);
    const legalContainerRef = useRef();

    useEffect(() => {
        setMessage(prevState => {
            return {...prevState,
                one: {
                    string: 'Please read the following:',
                    highlight: false,
                },
                two: {
                    string: '',
                    highlight: false,
                }}
        });
    }, []);

    const deleteUserError = async () => {
        const data = {
            email: email.string,
        };
        const res = await fetch('/create-user/error', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,

            }),
        });
        return await res.json();
    };

    const handleData = async (data) => {
        console.log(data);
        if (!!data.token) {
            localStorage.setItem('token', data.token);
            setLoading(false);
            setLogin(true);
            setPopup('');
            window.location = '/book';
        } else {
            const res = await deleteUserError();
            console.log(res)
            setLoading(false);
            setError(true);
        }
    };

    const verifyData = () => {
        return new Promise((resolve, reject) => {
            if(!legal.agree) {
                reject('User did not agree to terms');
            } else if(!email.string) {
                reject('Email is missing');
            } else if(!email.verified) {
                reject('Email was not verified');
            } else {
                resolve();
            }
        });
    };

    const createUser = async () => {
        setLoading(true);

        const data = {
            email: email.string,
            birthday: birthday,
            legal: legal,
            geoData: geoData,
        };

        try {
            await verifyData();
            const res = await fetch('/create-user/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.email,
                    birthday: data.birthday,
                    legal: data.legal,
                    geoData: data.geoData,
                }),
            });
            const dataRes = await res.json();
            handleData(dataRes);
        } catch ( err ) {
            console.log(err);
            setLoading(false);
        }
    };

    const clickCheckBox = (boolean) => {
        setLegal(prevState => {
            return {...prevState, agree: boolean};
        });
    };

    /* JSX output */
    if (stage !== 'create-user') {
        return <></>
    } else {
        return (
            <div className='create-user-stage-create-user-container'>
                <div
                    className={'legal-container '  + (loading ? 'loading' : '')}
                    ref={legalContainerRef}>
                    <p>{legal.content}</p>
                    <CheckBox
                        text='I agree'
                        callback={(boolean) => clickCheckBox(boolean)}/>
                </div>
                <SubmitButton
                    isActive={legal.agree}
                    value='Create User'
                    callback={() => createUser()}
                    loading={loading}/>

            </div>
        )
    }
}

export default CreateUserStageCreateUser