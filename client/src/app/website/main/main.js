import React from "react"
import { Routes, Route } from "react-router-dom"
import Pages from "./pages/pages"
import "./main.scss"

const Main = () => {
    /* JSX Output */
    return (
        <div className="main-container">
            <Routes>
                <Route path="/" element={ <Pages /> } />
                <Route path="/:page" element={ <Pages /> } />
            </Routes>
        </div>
    )
}

export default Main
