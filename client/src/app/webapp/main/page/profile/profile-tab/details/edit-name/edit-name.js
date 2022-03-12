import React, {useContext, useEffect, useState} from "react";
import {ProfileContext} from "../../../../../../../../context/profile-context";
import InputString from "../../../../../../../../components/input-string/input-string";
import Button from "../../../../../../../../components/button/button";
import SuccessIndicator from "../../../../../../../../components/success-indicator/success-indicator";
import "./edit-name.scss";

const EditName = () => {

    /* Global Variables */
    const {
        details,
        setDetails,
    } = useContext(ProfileContext);

    /* Locale Variables */
    const [save, setSave] = useState(false);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [indicateSuccess, setIndicateSuccess] = useState(false);
    const [edit, setEdit] = useState(false);

    /* Triggers */
    useEffect(() => {
        if (save) {
            saveNewValue();
        }
    }, [save]);

    useEffect(() => {
        if (!!name && name !== details.name) {
            setEdit(true);
        } else {
            setEdit(false);
        }
    }, [name, details.name]);

    /* Functions */
    const verifyValue = (value) => {
        return new Promise((resolve, reject) => {
            if (!!value) {
                resolve(true)
            } else {
                reject('No value');
            }
        });
    };

    const successIndicator = () => {
        setIndicateSuccess(true);
        setTimeout(() => {
            setIndicateSuccess(false);
        }, 2000);
    }

    const handleData = (data) => {
        setDetails(prevState => {
            return {...prevState, name: data.name}
        })
        setLoading(false);
        setSave(false);
        successIndicator();
    };

    const handleErr = (err) => {
        setLoading(false);
        setSave(false);
    };

    const saveNewValue = async () => {
        setLoading(true);
        try {
            await verifyValue(name);
            const token = window.localStorage.getItem('token');
                const res = await fetch('/profile-details/update-name', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: token,
                        name: name,
                    }),
                });
                const data = await res.json();
                handleData(data);
        } catch (err) {
            handleErr(err);
        }
    };

    /* JSX Output */
    return (
        <div className='edit-name-container'>
            <div className='title-container'>
                <h2>Name</h2>
                <SuccessIndicator
                    isActive={indicateSuccess}/>
            </div>
            <div className='input-container'>
                <InputString
                    loading={loading}
                    value={details.name}
                    typeLimit={15}
                    valueCallback={setName}/>
            </div>
            <div className='confirmation-container'>
                <Button
                    isActive={edit && !!name}
                    loading={loading}
                    unique={'save'}
                    value={'Save'}
                    callback={setSave}/>
            </div>
        </div>
    )
};

export default EditName;