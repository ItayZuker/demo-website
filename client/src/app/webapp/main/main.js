import React from "react";
import {Routes, Route} from "react-router-dom";
import Page from "./page/page";
import './main.scss';

const Main = () => {

    return (
        <div className='main-container'>
            <Routes>
                <Route path='/' element={ <Page /> } />
                <Route path='/:page' element={ <Page /> } />
            </Routes>
        </div>
    )
}

export default Main;