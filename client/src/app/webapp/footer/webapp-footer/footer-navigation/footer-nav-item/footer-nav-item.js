import React from "react";
import FooterSubPagesItem from "./footer-sub-pages-item/footer-sub-pages-item";
import './footer-nav-item.scss';

const FooterNavItem = (props) => {

    const getLink = (item) => {
        if (item.disableLink) {
            return "#"
        } else {
            const link = item.title;
            const lowerCase = link.toLowerCase();
            const split = lowerCase.split(' ');
            return split.join("-");
        }
    };

    return (
        <div className='footer-nav-item-container'>
            {props.item.subPages.length > 0 ?
                <a className='has-children'>{props.item.title}</a>
                :
                <a href={getLink(props.item)}>{props.item.title}</a>}
            {props.item.subPages.length > 0 ?
                <FooterSubPagesItem subPages={props.item.subPages}/>
                : <></>}
        </div>
    )
};

export default FooterNavItem;