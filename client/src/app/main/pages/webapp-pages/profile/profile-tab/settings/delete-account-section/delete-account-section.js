import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../../../../../../context/global-context";
import Button from "../../../../../../../../components/button/button";
import "./delete-account-section.scss";

const DeleteAccountSection = () => {

    const {
        popup,
        setPopup,
    } = useContext(GlobalContext);

    const [deleteAccount, setDeleteAccount] = useState(false);

    useEffect(() => {
        if(deleteAccount) {
            setPopup('delete-account');
        }
    }, [deleteAccount]);

    useEffect(() => {
        if(popup !== 'delete-account') {
            setDeleteAccount(false);
        }
    }, [popup]);

    return (
        <div className='delete-account-section-container'>
            <div className='text-container'>
                <p>Click to delete your account</p>
            </div>
            <Button
                isActive={true}
                loading={false}
                value={'Delete your account'}
                callback={setDeleteAccount}
                unique={'warning'}/>
        </div>
    )
};

export default DeleteAccountSection;