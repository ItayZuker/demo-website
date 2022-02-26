import React, {useContext} from "react";
import {GlobalContext} from "../../../../context/global-context";
import SideMenuDropdown from "./side-menu-dropdown/side-menu-dropdown";
import './side-menu-nav-item.scss';

const SideMenuNavItem = (props) => {

    const {
        sideMenuDropdown,
        setSideMenuDropdown,
    } = useContext(GlobalContext);

    /* Component Functions */
    const getLink = () => {
        if(props.item.subPages.length < 1) {
            const link = props.item.title;
            return "/" + fixLink(link);
        }
    }

    const fixLink = (string) => {
        const lowerCase = string.toLowerCase();
        const split = lowerCase.split(' ');
        return split.join("-");
    };

    const handleClick = () => {
        if(props.item.subPages.length > 0) {
            const link = fixLink(props.item.title);
            sideMenuDropdown === link ? setSideMenuDropdown('') : setSideMenuDropdown(link);
        } else {
            setSideMenuDropdown('');
        }
    };

    /* JSX Output */
    return (
        <div className='side-menu-nav-item'>
            <a
                className={(props.item.subPages.length > 0 ? 'children ' : '') + (sideMenuDropdown === fixLink(props.item.title) ? 'open' : '')}
                tabIndex={-1}
                onClick={() => handleClick()}
                onBlur={() => setSideMenuDropdown('')}
                href={getLink()}>{props.item.title}</a>
            {props.item.subPages.length > 0 ?
            <SideMenuDropdown
                page={fixLink(props.item.title)}
                subPages={props.item.subPages} /> : <></>}
        </div>
    )
}

export default SideMenuNavItem;