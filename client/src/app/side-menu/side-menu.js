import React, {useContext} from "react";
import {GlobalContext} from "../../context/global-context";
import SideMenuCreateUser from "./side-menu-create-user/side-menu-create-user";
import SideMenuNavigation from "./side-menu-navigation/side-menu-navigation";
import SideMenuLogin from "./side-menu-login/side-menu-login";
import closeIconLight from "../../assets/images/close-icon-light.svg";
import './side-menu.scss';

const SideMenu = () => {

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
            <div className={'side-menu-container ' + (sideMenuOpen ? 'active' : '')}>
                <div className='top-container'>
                    <img
                        onClick={() => handleClick()}
                        src={closeIconLight}/>
                </div>
                <SideMenuCreateUser />
                <SideMenuNavigation />
                <SideMenuLogin />
            </div>
        )
    }
}

export default SideMenu;