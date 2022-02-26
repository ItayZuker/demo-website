import React, {useContext} from "react";
import {GlobalContext} from "../../../../context/global-context";
import NavItem from "./nav-item/nav-item";
import data from '../../../../assets/json/navigation.json'
import './navigation.scss';


const Navigation = () => {

    const {
        media,
    } = useContext(GlobalContext);

    if(media !== 'desktop') {
        return <></>
    } else {
        return (
            <div className='navigation-container'>
                {data.website.header.map((item, index) => {
                    return <NavItem
                        key={index}
                        item={item}/>
                })}
            </div>
        )
    }
};

export default Navigation;