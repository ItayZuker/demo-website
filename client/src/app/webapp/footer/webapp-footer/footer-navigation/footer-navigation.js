import React from "react";
import data from "../../../../../assets/json/navigation.json";
import FooterNavItem from "./footer-nav-item/footer-nav-item";
import './footer-navigation.scss';

const FooterNavigation = () => {

    return (
        <div className='footer-navigation-container'>
            {data.webapp.footer.map((item, index) => {
                console.log(item)
                return <FooterNavItem
                    key={index}
                    item={item}/>
            })}
        </div>
    )
}

export default FooterNavigation;