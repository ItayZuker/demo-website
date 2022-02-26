import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../../context/global-context";
import ProfileThumbnailButton from "./profile-thumbnail-button/profile-thumbnail-button";
import Button from "../../../../components/button/button";
import './user.scss';

const User = () => {

    const {
        login,
        popup,
        setPopup,
    } = useContext(GlobalContext);

    const [tryLogin, setTryLogin] = useState(false);

    useEffect(() => {
        if(tryLogin) {
            setPopup('login');
        };
    }, [tryLogin]);

    useEffect(() => {
        if(popup !== 'login') {
            setTryLogin(false);
        }
    }, [popup]);


    return (
        <div className='user-container'>
            {login ?
                <ProfileThumbnailButton />
                :
                <Button
                    isActive={true}
                    loading={false}
                    value={'Login'}
                    callback={setTryLogin}/>}
        </div>
    )
}

export default User;