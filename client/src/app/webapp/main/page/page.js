import React from 'react';
import {ProfileContextComponent} from "../../../../context/profile-context";
import Book from "./book/book";
import Profile from "./profile/profile";
import {useParams} from "react-router-dom";
import './page.scss';

const Page = () => {

    /* Import global state variables */
    const {page} = useParams();

    /* JSX output */
    return (
        <div className='page-container'>
            <ProfileContextComponent>
                {page === undefined ? <Book/> : <></>}
                {page === '' ? <Book/> : <></>}
                {page === 'book' ? <Book/> : <></>}
                {page === 'profile' ? <Profile/> : <></>}
            </ProfileContextComponent>
        </div>
    )
}

export default Page