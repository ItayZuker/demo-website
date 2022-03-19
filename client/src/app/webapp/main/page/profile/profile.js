import React, {useContext, useState, useEffect} from "react";
import ProfileNavigation from "./profile-navigation/profile-navigation";
import ProfileTab from "./profile-tab/profile-tab";
import "./profile.scss";
import {GlobalContext} from "../../../../../context/global-context";
import {ProfileContext} from "../../../../../context/profile-context";

const Profile = () => {

    /* Global Variables */
    const {
        login,
    } = useContext(GlobalContext);

    const {
        setDetails,
        setCountries,
        setGlobals,
    } = useContext(ProfileContext);

    /* Locale Variables */
    const [loading, setLoading] = useState(true);
    const [profileDetailsReady, setProfileDetailsReady] = useState(false);
    const [countriesReady, setCountriesReady] = useState(false);
    const [globalsReady, setGlobalsReady] = useState(false);

    /* Triggers */
    useEffect(() => {
        if (profileDetailsReady && countriesReady && globalsReady) {
            setLoading(false);
        }
    }, [profileDetailsReady, countriesReady, globalsReady]);

    useEffect(async () => {
        if (login) {
            await getProfileDetails();
            await getCountries();
            await getGlobals();
        } else {
            window.location = '/';
        }
    }, []);

    /* Functions */
    const getGlobals = async () => {
        const token = window.localStorage.getItem('token');
        try {
            const res = await fetch('/profile-details/globals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                    type: 'gender'
                }),
            });
            const data = await res.json();
            setGlobals(prevState => {
                return {...prevState, gender: data.list}
            })
            setGlobalsReady(true);
        } catch ( err ) {
            console.log(err);
        }
    }

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
            <div className='profile-container'>
                <ProfileNavigation />
                <ProfileTab />
            </div>
        )
    }
}

export default Profile;