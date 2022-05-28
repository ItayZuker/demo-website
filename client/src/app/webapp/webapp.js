import React, { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../context/global-context"
import LoadingPopup from "./popups/loading-popup/loading-popup"
import DeleteAccountPopup from "./popups/delete-account-popup/delete-account-popup"
import CreateInvitationPopup from "./popups/create-invitation-popup/create-invitation-popup"
import MyGalleryPopup from "./popups/my-gallery-popup/my-gallery-popup"
import Header from "./header/header"
import Footer from "./footer/footer"
import Main from "./main/main"
import "./webapp.scss"

const Webapp = () => {
    /* Global Variables */
    const {
        login,
        popup,
        setUser,
        setCountries,
        setGlobals,
        logout,
        getCountries,
        getUserData,
        getGlobals
    } = useContext(GlobalContext)

    /* Locale Variables */
    const [loading, setLoading] = useState(true)
    const [profileDetailsReady, setProfileDetailsReady] = useState(false)
    const [countriesReady, setCountriesReady] = useState(false)
    const [globalsReady, setGlobalsReady] = useState(false)

    /* Triggers */
    useEffect(() => {
        if (profileDetailsReady && countriesReady && globalsReady) {
            setLoading(false)
        }
    }, [profileDetailsReady, countriesReady, globalsReady])

    useEffect(async () => {
        if (login) {
            updateUser()
            updateCountries()
            updateGlobals()
        } else {
            logout()
        }
    }, [])

    /* Functions */
    const updateGlobals = async () => {
        const data = await getGlobals()
        setGlobals(data)
        setGlobalsReady(true)
    }
    const updateUser = async () => {
        const data = await getUserData()
        setUser(data)
        setProfileDetailsReady(true)
    }
    const updateCountries = async () => {
        const data = await getCountries()
        setCountries(data)
        setCountriesReady(true)
    }

    /* JSX Output */
    if (loading) {
        return <></>
    } else {
        return (
            <div className="webapp-container">
                {popup === "loading" ? <LoadingPopup/> : <></>}
                {popup === "delete-account" ? <DeleteAccountPopup/> : <></>}
                {popup === "create-invitation" ? <CreateInvitationPopup/> : <></>}
                {popup === "my-gallery" ? <MyGalleryPopup/> : <></>}
                <Header/>
                <Main/>
                <Footer/>
            </div>
        )
    }
}

export default Webapp
