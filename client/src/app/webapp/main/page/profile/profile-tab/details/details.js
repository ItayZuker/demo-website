import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../../../../../context/global-context";
import {ProfileContext} from "../../../../../../../context/profile-context";
import EditName from "./edit-name/edit-name";
import EditCountry from "./edit-country/edit-country";
import "./details.scss";

const Details = () => {

    /* Global Variables */
    const {
        login,
    } = useContext(GlobalContext);

    const {
        setDetails,
        setCountries,
    } = useContext(ProfileContext);

    /* Locale Variables */
    const [loading, setLoading] = useState(true);
    const [profileDetailsReady, setProfileDetailsReady] = useState(false);
    const [countriesReady, setCountriesReady] = useState(false);

    /* Triggers */
    useEffect(() => {
        if (profileDetailsReady && countriesReady) {
            setLoading(false);
        }
    }, [profileDetailsReady, countriesReady]);

    useEffect(() => {
        if (login) {
            getProfileDetails();
            getCountries();
        } else {
            window.location = '/';
        }
    }, []);

    /* Functions */
    const getCountries = async () => {
        const token = window.localStorage.getItem('token');
        try {
            const res = await fetch('/profile-details/get-countries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                }),
            });
            const data = await res.json();
            setCountries(data);
            setCountriesReady(true);
        } catch ( err ) {
            console.log(err);
        }
    };

    const getProfileDetails = async () => {
        const token = window.localStorage.getItem('token');
        try {
            const res = await fetch('/profile-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,

                }),
            });
            const data = await res.json();
            setDetails(data);
            setProfileDetailsReady(true);
        } catch ( err ) {
            console.log(err);
        }
    };

    /* JSX Output */
    if (loading) {
        return <></>
    } else {
        return (
            <div className='details-container'>
                <p>Your details are complete. If you want to update something, click the save button when you are done.</p>
                <EditName />
                <EditCountry />
            </div>
        )
    }
};

export default Details;