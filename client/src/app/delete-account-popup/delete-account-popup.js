import React, {useContext, useEffect} from "react";
import {GlobalContext} from "../../context/global-context";
import DeleteAccount from "./delete-account/delete-account";
import "./delete-account-popup.scss";

const DeleteAccountPopup = () => {

    /* Import Global Variables */
    const {
        popup,
    } = useContext(GlobalContext);

    /* JSX Output */
    if(popup !== 'delete-account') {
        return <></>
    } else {
        return (
            <div className='delete-account-popup-container'>
                <DeleteAccount />
            </div>
        )
    }
}

export default DeleteAccountPopup;