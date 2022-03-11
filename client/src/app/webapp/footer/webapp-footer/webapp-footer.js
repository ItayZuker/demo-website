import React from "react";
import FooterNavigation from "./footer-navigation/footer-navigation";

import "./webapp-footer.scss";

const WebappFooter = () => {

    return (
        <div className='webapp-footer-container'>
            <FooterNavigation />
            <div className='bottom-container'>
                <p>demoWebsite Copyrights</p>
            </div>
        </div>
    )
};

export default WebappFooter;