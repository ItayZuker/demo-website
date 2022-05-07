import React, { useContext } from "react"
import { GlobalContext } from "../../context/global-context"
import Header from "./header/header"
import SideMenu from "./side-menu/side-menu"
import Main from "./main/main"
import Footer from "./footer/footer"
import LoginPopup from "./popups/login-popup/login-popup"
import CreateUserPopup from "./popups/create-user-popup/create-user-popup"
import LoadingPopup from "./popups/loading-popup/loading-popup"
import "./website.scss"

const Website = () => {
    /* Global variables */
    const {
        popup
    } = useContext(GlobalContext)

    /* JSX Output */
    return (
        <div className="website-container">
            { popup === "loading" ? <LoadingPopup /> : <></> }
            { popup === "create-user" ? <CreateUserPopup/> : <></> }
            { popup === "login" ? <LoginPopup/> : <></> }
            { /* { popup === 'delete-account' ? <DeleteAccountPopup/> : <></> } */ }
            <SideMenu/>
            <Header/>
            <Main/>
            <Footer/>
        </div>
    )
}

export default Website
