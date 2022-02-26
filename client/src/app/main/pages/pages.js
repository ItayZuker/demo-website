import React, {useContext} from 'react';
import {GlobalContext} from "../../../context/global-context";
import WebAppPages from "./webapp-pages/webapp-pages";
import WebsitePages from "./website-pages/website-pages";
import {ProfileContextComponent} from "../../../context/profile-context";
import './pages.scss';

const Pages = () => {

    /* Import global state variables */
    const {
        login,
    } = useContext(GlobalContext);

    /* JSX output */
    return (
        <div className='pages-container'>
            {
                login ?
                    <ProfileContextComponent>
                        <WebAppPages/>
                    </ProfileContextComponent>
                    :
                    <WebsitePages/>
            }
        </div>
    )
}

export default Pages