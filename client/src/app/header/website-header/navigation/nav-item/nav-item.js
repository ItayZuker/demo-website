import React, {useState} from "react";
import Dropdown from "./dropdown/dropdown";
import './nav-item.scss';

const NavItem = (props) => {

    const [openDrop, setOpenDrop] = useState(false);

    const getLink = () => {
        if(props.item.subPages.length > 0) {
            if(props.item.disableLink) {
                return "#"
            } else {
                const link = props.item.subPages[0].title;
                return "/" + fixLink(link);
            }
        } else {
            const link = props.item.title;
            return "/" + fixLink(link);
        }
    }

    const fixLink = (string) => {
        const lowerCase = string.toLowerCase();
        const split = lowerCase.split(' ');
        return split.join("-");
    };

    return (
        <div
            className='nav-item-container'
            onMouseEnter={() => setOpenDrop(true)}
            onMouseLeave={() => setOpenDrop(false)}>
            <a href={getLink()}>{props.item.title}</a>
            {props.item.subPages.length > 0 ?
                <Dropdown
                    hide={!openDrop}
                    subPages={props.item.subPages} /> : <></>}
        </div>
    )
};

export default NavItem;