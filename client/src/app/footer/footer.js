import React, {useContext} from "react";
import {GlobalContext} from "../../context/global-context";
import WebsiteFooter from "./website-footer/website-footer";
import WebappFooter from "./webapp-footer/webapp-footer";
import './footer.scss';

const Footer = () => {

    const {
        login,
    } = useContext(GlobalContext);

    return (
        <div
            id='footer-container'
            className='footer-container'>
            {login ? <WebappFooter /> : <WebsiteFooter />}
        </div>
    )
}

export default Footer;