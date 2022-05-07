import React from "react"
import WSHome from "./home/home"
import WSMission from "./mission/mission"
import WSCareers from "./careers/careers"
import WSFAQ from "./faq/faq"
import WSContact from "./contact/contact"
import WSDownload from "./download/download"
import WSPrivacy from "./privacy/privacy"
import { useParams } from "react-router-dom"
import "./pages.scss"

const Pages = () => {
    /* Global Variables */
    const { page } = useParams()

    /* JSX Output */
    return (
        <div className="pages-container">
            {page === undefined ? <WSHome /> : <></>}
            {page === "home" ? <WSHome /> : <></>}
            {page === "mission" ? <WSMission /> : <></>}
            {page === "careers" ? <WSCareers /> : <></>}
            {page === "faq" ? <WSFAQ /> : <></>}
            {page === "contact" ? <WSContact /> : <></>}
            {page === "download" ? <WSDownload /> : <></>}
            {page === "privacy" ? <WSPrivacy /> : <></>}
        </div>
    )
}

export default Pages
