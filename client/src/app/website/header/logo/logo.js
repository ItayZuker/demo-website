import React from "react";
import logoImage from '../../../../assets/images/demoLogo.svg';
import './logo.scss';

const Logo = () => {

    return (
        <div className='logo-container'>
            <a href={"/home"}>
                <img src={logoImage}/>
            </a>
        </div>
    )
};

export default Logo;