import React from "react";
import './footer-sub-pages-item.scss';

const FooterSubPagesItem = (props) => {

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
        <div className='footer-sub-pages-item-container'>
            {props.subPages.map((item, index) => {
                    return <a
                        key={index}
                        href={getLink(item)}>{item.title}</a>
                })}
        </div>
    )
};

export default FooterSubPagesItem