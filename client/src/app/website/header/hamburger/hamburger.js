import React, {useContext} from 'react';
import {GlobalContext} from "../../../../context/global-context";
import menuIcon from "../../../../assets/images/menu-icon.svg";
import './hamburger.scss';

const Hamburger = () => {

    const {
        sideMenuOpen,
        setSideMenuOpen,
        media,
    } = useContext(GlobalContext);

    const handleClick = () => {
        sideMenuOpen ? setSideMenuOpen(false) : setSideMenuOpen(true);
    };

    if(media === 'desktop') {
        return <></>
    } else {
        return (
            <div className='hamburger-container'>
                <img
                    onClick={() => handleClick()}
                    src={menuIcon} />
            </div>
        )
    }
}

export default Hamburger;