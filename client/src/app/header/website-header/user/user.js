import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../../context/global-context";
import Button from "../../../../components/button/button";
import './user.scss';

const User = () => {

    const {
        media,
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

    if(media !== 'desktop') {
        return <></>
    } else {
        return (
            <div className='user-container'>
                <Button
                    isActive={true}
                    loading={false}
                    value={'Login'}
                    callback={setTryLogin}/>
            </div>
        )
    }
}

export default User;