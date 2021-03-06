import React from "react"
import data from "../../../../assets/json/navigation.json"
import FooterNavItem from "./footer-nav-item/footer-nav-item"
import "./footer-navigation.scss"

const FooterNavigation = () => {
    /* JSX Output */
    return (
        <div className="footer-navigation-container">
            {data.website.footer.map((item, index) => {
                return <FooterNavItem
                    key={index}
                    item={item}/>
            })}
        </div>
    )
}

export default FooterNavigation
