import React, {useContext} from "react";
import {GlobalContext} from "../../context/global-context";
import "./loading-popup.scss";

const LoadingPopup = () => {

    /* Import Global Variables */
    const {
        popup,
    } = useContext(GlobalContext);

    /* JSX Output */
    if(popup !== 'loading') {
        return <></>
    } else {
        return (
            <div className='loading-popup-container'>

            </div>
        )
    }
};

export default LoadingPopup;