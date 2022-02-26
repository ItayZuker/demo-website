import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../../../../../../context/global-context";
import Button from "../../../../../../../../components/button/button";
import "./logout-section.scss";

const LogoutSection = () => {

    const {
        setLogin,
        setPopup,
    } = useContext(GlobalContext);

    const [logout, setLogout] = useState(false);

    useEffect(() => {
        if(logout) {
            logoutAccount();
        }
    }, [logout])

    const handleData = (data) => {
        console.log(data)
        if (data.logout) {
            setPopup('');
            setLogin(false);
            localStorage.removeItem('token');
            window.location.href = "/home";
        } else {
            /* Something went wrong, try to logout again */
        }
    };

    const logoutAccount = async () => {
        setPopup('loading');
        const token = window.localStorage.getItem('token');
        try {
            const res = await fetch('/profile-settings/logout', {
                method: 'PUT',
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
            setPopup('');
        }
    };

    return (
        <div className='logout-section-container'>
            <div className='text-container'>
                <p>Click to logout your account</p>
            </div>
            <Button
                isActive={true}
                loading={false}
                value={'Logout'}
                callback={setLogout}/>
        </div>
    )
};

export default LogoutSection;