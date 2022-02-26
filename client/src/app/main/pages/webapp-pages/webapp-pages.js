import React, {useContext} from "react";
import {GlobalContext} from "../../../../context/global-context";
import {useParams} from "react-router-dom";
import Profile from "./profile/profile.js";
import Book from "./book/book";
import "./webapp-pages.scss";

const WebappPages = () => {

    /* Import global state variables */
    const {page} = useParams();

    const {
        login,
    } = useContext(GlobalContext);

    /* JSX output */
    if (!login) {
        return <></>
    } else {
        return (
            <div className='webapp-pages-container'>
                {page === undefined ? <Book/> : <></>}
                {page === '' ? <Book/> : <></>}
                {page === 'book' ? <Book/> : <></>}
                {page === 'profile' ? <Profile/> : <></>}
            </div>
        )
    }
};

export default WebappPages;