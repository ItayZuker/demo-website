import React, { useState, useEffect } from "react"
import { useMediaFix } from "../hooks/media-query"
// import { io } from "socket.io-client";
const GlobalContext = React.createContext()

const GlobalContextComponent = (props) => {
    /* Locale Variables */
    // const [socket] = useState(() => io("http://localhost:5000"))// ---> Should be the actual socket host
    const [sideMenuOpen, setSideMenuOpen] = useState(false)
    const [countries, setCountries] = useState([])
    const [popup, setPopup] = useState("")
    const [media, setMedia] = useState("desktop")
    const [sideMenuDropdown, setSideMenuDropdown] = useState("")
    const [geoData, setGeoData] = useState({})
    const [login, setLogin] = useState(false)
    const [globalMessage, setGlobalMessage] = useState("")
    const [user, setUser] = useState({})
    const [globals, setGlobals] = useState({})
    const [action, setAction] = useState({})

    /* Import Custom Hooks */
    const { mediaFix } = useMediaFix()

    /* Triggers */
    useEffect(() => {
        tryLogin()
    }, [])

    useEffect(() => {
        updateGeoData()
        setMedia(mediaFix())
        window.addEventListener("resize", () => {
            setMedia(mediaFix())
        })
    }, [])

    useEffect(() => {
        sideMenu()
    }, [sideMenuOpen])

    useEffect(() => {
        popUp()
    }, [popup])

    /* Socket */
    useEffect(() => {
        // const token = window.localStorage.getItem('token');
        // socket.auth = { token: token }
        // socket.connect()
    }, [])

    /* Functions */
    const getCountries = async () => {
        const token = window.localStorage.getItem("token")
        try {
            const res = await fetch("/profile-details/get-countries", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token
                })
            })
            const data = await res.json()
            if (data.expiredAt) {
                logout()
            } else {
                return data
            }
        } catch (err) {
            logout()
        }
    }

    const logout = () => {
        setLogin(false)
        localStorage.removeItem("token")
        window.location.href = "/"
    }

    const tryLogin = () => {
        const token = window.localStorage.getItem("token")
        if (token) {
            /* TODO: Create and update new token, to refresh expiration date  */
            setLogin(true)
        } else {
            setLogin(false)
        }
        window.addEventListener("storage", () => {
            const token = window.localStorage.getItem("token")
            if (!token) {
                setLogin(false)
            }
        })
    }

    const sideMenu = () => {
        const appContainer = document.querySelector("body")
        if (sideMenuOpen) {
            appContainer.classList.add("side-menu-active")
        } else {
            appContainer.classList.remove("side-menu-active")
        }
    }

    const popUp = () => {
        const appContainer = document.querySelector("body")
        if (popup) {
            appContainer.classList.add("popup-active")
        } else {
            appContainer.classList.remove("popup-active")
        }
    }

    const updateGeoData = async () => {
        const geoData = await getGeoData()
        if (geoData) {
            setGeoData({
                countryCode: geoData.countryCode,
                countryName: geoData.countryName,
                ageLimit: geoData.ageLimit
            })
        }
    }

    const getCountryData = async (countryName) => {
        try {
            const res = await fetch("/website/get-country-data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    countryName
                })
            })
            return await res.json()
        } catch (err) {
        }
    }

    const getGeoData = async () => {
        try {
            const res = await fetch("https://geolocation-db.com/json/")
            const data = await res.json()
            return await getCountryData(data.country_name)
        } catch (err) {
            setGeoData({
                countryCode: undefined,
                countryName: undefined,
                ageLimit: null
            })
        }
    }

    const getUserData = async () => {
        const token = window.localStorage.getItem("token")
        try {
            const res = await fetch("/profile-details", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token
                })
            })
            const data = await res.json()
            if (data.expiredAt) {
                logout()
            } else {
                return data
            }
        } catch (err) {
            logout()
        }
    }

    const getGlobals = async () => {
        const token = window.localStorage.getItem("token")
        try {
            const res = await fetch("/global/data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token
                })
            })
            const data = await res.json()
            if (data.expiredAt) {
                logout()
            } else {
                return data
            }
        } catch (err) {
            logout()
        }
    }

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
        user,
        setUser,
        countries,
        setCountries,
        globals,
        setGlobals,
        action,
        setAction,
        logout,
        getUserData,
        getCountries,
        getGlobals
        // socket
    }

    /* JSX Output */
    return (
        <GlobalContext.Provider value={ contextValue }>
            { props.children }
        </GlobalContext.Provider>
    )
}

export { GlobalContext, GlobalContextComponent }
