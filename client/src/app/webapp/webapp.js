import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../context/global-context";
// import {ProfileContext} from "../../context/profile-context";
import LoadingPopup from "./popups/loading-popup/loading-popup";
import DeleteAccountPopup from "./popups/delete-account-popup/delete-account-popup";
import CreateInvitationPopup from "./popups/create-invitation-popup/create-invitation-popup";
import Header from "./header/header";
import Footer from "./footer/footer";
import Main from "./main/main";
import "./webapp.scss";

const Webapp = () => {

    /* Global Variables */
    const {
        login,
        popup,
        setDetails,
        setCountries,
        setGlobals,
    } = useContext(GlobalContext);

    // const {
    //     setTab
    // } = useContext(ProfileContext);

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

    /* SOCKET TESTING START */
    // const socketTest = async () => {
    //     const token = window.localStorage.getItem('token');
    //     try {
    //         const res = await fetch('/socket-server/user/test', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 token: token,
    //             }),
    //         });
    //     } catch ( err ) {
    //         console.log(err);
    //     }
    // };
    /* SOCKET TESTING END */

    /* JSX Output */
    if (loading) {
        return <></>
    } else {
        return (
            <div className='webapp-container'>
                {popup === 'loading' ? <LoadingPopup/> : <></>}
                {popup === 'delete-account' ? <DeleteAccountPopup/> : <></>}
                {popup === 'create-invitation' ? <CreateInvitationPopup/> : <></>}
                <Header/>
                <Main/>
                <Footer/>
            </div>
        )
    }
};

export default Webapp;