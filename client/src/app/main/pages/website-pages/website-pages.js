import React, {useContext} from "react";
import {GlobalContext} from "../../../../context/global-context";
import {useParams} from "react-router-dom";
import WS_Home from "./home/home";
import WS_Mission from "./mission/mission";
import WS_Careers from "./careers/careers";
import WS_FAQ from "./faq/faq";
import WS_Contact from "./contact/contact";
import WS_Download from "./download/download";
import WS_Privacy from "./privacy/privacy";
import "./website-pages.scss";

const WebsitePages = () => {

    /* Import global state variables */
    const {page} = useParams();

    const {
        login,
    } = useContext(GlobalContext);

    /* JSX Output */
    if (login) {
        return <></>
    } else {
        return (
            <div className='website-pages-container'>
                {page === undefined ? <WS_Home /> : <></>}
                {page === 'home' ? <WS_Home /> : <></>}
                {page === 'mission' ? <WS_Mission /> : <></>}
                {page === 'careers' ? <WS_Careers /> : <></>}
                {page === 'faq' ? <WS_FAQ /> : <></>}
                {page === 'contact' ? <WS_Contact /> : <></>}
                {page === 'download' ? <WS_Download /> : <></>}
                {page === 'privacy' ? <WS_Privacy /> : <></>}
            </div>
        )
    }
};

export default WebsitePages;