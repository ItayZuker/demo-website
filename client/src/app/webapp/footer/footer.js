import React from "react"
import FooterNavigation from "./footer-navigation/footer-navigation"
import "./footer.scss"

const Footer = () => {
    /* JSX Output */
    return (
        <div
            id='footer-container'
            className='footer-container'>
            <FooterNavigation />
            <div className='bottom-container'>
                <p>demoWebsite Copyrights</p>
            </div>
        </div>
    )
}

export default Footer
