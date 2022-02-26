import React, {useContext, useEffect} from "react";
import {GlobalContext} from "../../context/global-context";
import './create-user-popup-button.scss';

const CreateUserPopupButton = () => {

    const {
        setPopup,
    } = useContext(GlobalContext);

    return (
        <div
            className='create-user-popup-button-container'
            onClick={() => setPopup('create-user')}>
            <p>Create User</p>
        </div>
    )
}

export default CreateUserPopupButton;