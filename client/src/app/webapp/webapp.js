import React, {useContext, useEffect} from "react";
import {GlobalContext} from "../../context/global-context";
import LoadingPopup from "./popups/loading-popup/loading-popup";
import DeleteAccountPopup from "./popups/delete-account-popup/delete-account-popup";
import CreateInvitationPopup from "./popups/create-invitation-popup/create-invitation-popup";
import CreateChatInvitationPopup from "./popups/create-chat-invitation-popup/create-chat-invitation-popup";
import Header from "./header/header";
import Footer from "./footer/footer";
import Main from "./main/main";
import "./webapp.scss";

const Webapp = () => {

    const {
        popup,
    } = useContext(GlobalContext);

    useEffect(() => {
        console.log(popup)
    }, [popup])

    return (
        <div className='webapp-container'>
            { popup === 'loading' ? <LoadingPopup /> : <></> }
            { popup === 'delete-account' ? <DeleteAccountPopup /> : <></> }
            { popup === 'create-invitation' ? <CreateInvitationPopup /> : <></> }
            { popup === 'create-chat-invitation' ? <CreateChatInvitationPopup /> : <></> }
            {/*{ popup === 'create-date-invitation' ? <CreateDateInvitationPopup /> : <></> }*/}
            <Header/>
            <Main/>
            <Footer/>
        </div>
    )
};

export default Webapp;