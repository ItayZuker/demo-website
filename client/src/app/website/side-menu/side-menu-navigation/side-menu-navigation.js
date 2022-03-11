import React from "react";
import data from "../../../../assets/json/navigation.json";
import SideMenuNavItem from "./side-menu-nav-item/side-menu-nav-item";
import './side-menu-navigation.scss';

const SideMenuNavigation = () => {

    return (
        <div className='side-menu-navigation-container'>
            {data.website.header.map((item, index) => {
                return <SideMenuNavItem
                    key={index}
                    item={item}/>
            })}
        </div>
    )
}

export default SideMenuNavigation;