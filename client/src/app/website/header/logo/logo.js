import React from "react"
import logoImage from "../../../../assets/images/demoLogo.svg"
import "./logo.scss"

const Logo = () => {
    /* JSX Output */
    return (
        <div className="logo-container">
            <a href={"/home"}>
                <img
                    alt={"Logo"}
                    src={logoImage}/>
            </a>
        </div>
    )
}

export default Logo
