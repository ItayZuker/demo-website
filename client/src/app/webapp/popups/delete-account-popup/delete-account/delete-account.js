import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../../../context/global-context";
import Button from "../../../../../components/button/button";
import "./delete-account.scss";

const DeleteAccount = () => {

    /* Import Global Variables */
    const {
        setPopup,
        setLogin,
        setGlobalMessage,
    } = useContext(GlobalContext);

    const [cancel, setCancel] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(cancel) {
            setPopup('');
        }
    }, [cancel])

    useEffect(() => {
        if(deleteAccount) {
            deleteAccountPermanently();
        }
    }, [deleteAccount]);

    const handleData = (data) => {
        if (data.deleted) {
            console.log(data.message);
            localStorage.removeItem('token');
            setLogin(false);
            setGlobalMessage('account-deleted');
            window.location = '/';
        } else {
            /* something went wrong */
        }
    };

    const deleteAccountPermanently = async () => {
        setLoading(true);
        const token = window.localStorage.getItem('token');
        try {
            const res = await fetch('/profile-settings/delete-account', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,

                }),
            });
            const data = await res.json();
            handleData(data);
        } catch ( err ) {
            console.log(err);
            setLoading(false);
        }
    };

    /* JSX Output */
    return (
        <div className='delete-account-container'>
            <div className='text-container'>
                <p>If you delete your account, all your data will be deleted permanently. Are you sure you want to delete?</p>
            </div>
            <div className='buttons-container'>
                <Button
                    isActive={true}
                    loading={loading}
                    value={'Yes, Delete'}
                    callback={setDeleteAccount}
                    unique={'warning'}/>
                <Button
                    isActive={true}
                    loading={loading}
                    value={'Cancel'}
                    callback={setCancel}/>
            </div>
        </div>
    )
}

export default DeleteAccount;