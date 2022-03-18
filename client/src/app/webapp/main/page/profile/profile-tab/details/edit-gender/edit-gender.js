import React, {useContext, useEffect, useState} from "react";
import "./edit-gender.scss";
import SuccessIndicator from "../../../../../../../../components/success-indicator/success-indicator";
import InputDropdown from "../../../../../../../../components/input-dropdown/input-dropdown";
import Button from "../../../../../../../../components/button/button";
import {ProfileContext} from "../../../../../../../../context/profile-context";

const EditGender = () => {

    /* Global Variables */
    const {
        globals,
        details,
        setDetails,
    } = useContext(ProfileContext);

    /* Local Variables */
    const [indicateSuccess, setIndicateSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [gender, setGender] = useState(details.gender || '');
    const [gendersArray, setGendersArray] = useState(globals.gender || []);
    const [edit, setEdit] = useState(false);
    const [save, setSave] = useState(false);

    /* Triggers */
    useEffect(() => {
        setGendersArray(globals.gender);
    }, [globals.gender]);

    useEffect(() => {
        if (!!gender && gender !== details.gender) {
            setEdit(true);
        } else {
            setEdit(false);
        }
    }, [gender, details.geoData.countryName]);

    useEffect(async () => {
        if (save) {
            await saveNewValue();
        }
    }, [save]);

    /* Functions */
    const successIndicator = () => {
        setIndicateSuccess(true);
        setTimeout(() => {
            setIndicateSuccess(false);
        }, 2000);
    }

    const handleData = (data) => {
        setDetails(prevState => {
            return {...prevState, gender: data.gender}
        })
        setLoading(false);
        setSave(false);
        successIndicator();
    };

    const handleErr = () => {
        setLoading(false);
        setSave(false);
    };

    const saveNewValue = async () => {
        setLoading(true);
        try {
            const token = window.localStorage.getItem('token');
            const res = await fetch('/profile-details/update-gender', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                    gender: gender,
                }),
            });
            const data = await res.json();
            handleData(data);
        } catch (err) {
            handleErr(err);
        }
    }

    /* JSX Output */
    return (
        <div className={'edit-gender-container ' + (details.gender ? '' : 'missing-value')}>
            <div className='title-container'>
                <h2>Gender</h2>
                <SuccessIndicator
                    isActive={indicateSuccess}/>
            </div>
            <div className='input-container'>
                <InputDropdown
                    isActive={true}
                    loading={loading}
                    placeholder={'Not selected'}
                    value={gender}
                    array={gendersArray}
                    valueCallback={setGender}/>
            </div>
            <div className='confirmation-container'>
                <Button
                    isActive={edit && !!gender}
                    loading={loading}
                    unique={'save'}
                    value={'Save'}
                    callback={setSave}/>
            </div>
        </div>
    )
};

export default EditGender;