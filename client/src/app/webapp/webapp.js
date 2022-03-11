import React, {useContext} from "react";
import {GlobalContext} from "../../context/global-context";
import LoadingPopup from "./popups/loading-popup/loading-popup";
import DeleteAccountPopup from "./popups/delete-account-popup/delete-account-popup";
import Header from "./header/header";
import Footer from "./footer/footer";
import Main from "./main/main";
import "./webapp.scss";

const Webapp = () => {

    const {
        popup,
    } = useContext(GlobalContext);

    return (
        <div className='webapp-container'>
            { popup === 'loading' ? <LoadingPopup /> : <></> }
            { popup === 'delete-account' ? <DeleteAccountPopup/> : <></> }
            <Header/>
            <Main/>
            <Footer/>
        </div>
    )
};

export default Webapp;