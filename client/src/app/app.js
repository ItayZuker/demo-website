import React, {useContext, useEffect} from "react";
import {GlobalContext} from "../context/global-context";
import Header from "./header/header";
import Main from "./main/main";
import Footer from "./footer/footer";
import SideMenu from "./side-menu/side-menu";
import LoadingPopup from "./loading-popup/loading-popup";
import CreateUserPopup from "./create-user-popup/create-user-popup";
import LoginPopup from "./login-popup/login-popup";
import DeleteAccountPopup from "./delete-account-popup/delete-account-popup";
import './app.scss';

const App = () => {

    const {
        popup,
    } = useContext(GlobalContext);

    /* JSX Output */
    return (
        <div className='app-container'>
            { popup === 'loading' ? <LoadingPopup /> : <></> }
            { popup === 'create-user' ? <CreateUserPopup/> : <></> }
            { popup === 'login' ? <LoginPopup/> : <></> }
            { popup === 'delete-account' ? <DeleteAccountPopup/> : <></> }
            <SideMenu/>
            <Header/>
            <Main/>
            <Footer/>
        </div>
    )
}

export default App;