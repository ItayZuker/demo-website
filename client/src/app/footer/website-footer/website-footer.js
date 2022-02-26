import React from "react";
import FooterNavigation from "./footer-navigation/footer-navigation";
import "./website-footer.scss";

const WebsiteFooter = () => {

    return (
        <div className='website-footer-container'>
            <FooterNavigation />
            <div className='bottom-container'>
                <p>demoWebsite Copyrights</p>
            </div>
        </div>
    )
};

export default WebsiteFooter;