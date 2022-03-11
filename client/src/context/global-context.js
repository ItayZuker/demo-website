import React, {useState, useEffect} from "react";
import {useMediaFix} from "../hooks/media-query";
const GlobalContext = React.createContext();

const GlobalContextComponent = (props) => {

    const [sideMenuOpen, setSideMenuOpen] = useState(false);
    const [popup, setPopup] = useState('');
    const [media, setMedia] = useState('desktop');
    const [sideMenuDropdown, setSideMenuDropdown] = useState('');
    const [geoData, setGeoData] = useState({});
    const [login, setLogin] = useState(false);
    const [globalMessage, setGlobalMessage] = useState('');

    /* Import Custom Hooks */
    const {mediaFix} = useMediaFix();

    /* Trigger on Variable Change */
    useEffect(() => {
        tryLogin();
    }, [])

    useEffect(() => {
        updateGeoData();
        setMedia(mediaFix());
        window.addEventListener('resize', () => {
            setMedia(mediaFix());
        });
    }, []);

    useEffect(() => {
        sideMenu();
    }, [sideMenuOpen]);

    useEffect(() => {
        popUp();
    }, [popup]);

    /* Component Functions */
    const tryLogin = () => {
        const token = window.localStorage.getItem('token');
        if(!!token) {
            setLogin(true);
        } else {
            setLogin(false);
        }
        window.addEventListener('storage', () => {
            const token = window.localStorage.getItem('token');
            if(!token) {
                setLogin(false);
            }
        });
    };

    const sideMenu = () => {
        const appContainer = document.querySelector('body');
        if(sideMenuOpen) {
            appContainer.classList.add('side-menu-active');
        } else {
            appContainer.classList.remove('side-menu-active');
        }
    };

    const popUp = () => {
        const appContainer = document.querySelector('body');
        if(!!popup) {
            appContainer.classList.add('popup-active');
        } else {
            appContainer.classList.remove('popup-active');
        }
    };

    const updateGeoData = async () => {
        const geoData = await getGeoData();
        if (!!geoData) {
            setGeoData({
                countryCode: geoData.country_code,
                countryName: geoData.country_name
            });
        }
    };

    const getGeoData = async () => {
        try {
            const data = await fetch(`https://geolocation-db.com/json/`);
            return data.json();
        } catch (err) {
            console.log(err);
            setGeoData({
                countryCode: '',
                countryName: ''
            });
        }
    };

    /* Context Payload */
    const contextValue = {
        media,
        sideMenuOpen,
        setSideMenuOpen,
        sideMenuDropdown,
        setSideMenuDropdown,
        popup,
        setPopup,
        geoData,
        login,
        setLogin,
        globalMessage,
        setGlobalMessage,
    };

    /* JSX Output */
    return (
        <GlobalContext.Provider value={ contextValue }>
            { props.children }
        </GlobalContext.Provider>
    )
}

export { GlobalContext, GlobalContextComponent }
