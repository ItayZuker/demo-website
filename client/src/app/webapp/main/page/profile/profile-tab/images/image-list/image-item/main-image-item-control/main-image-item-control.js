import React, { useContext, useState } from "react"
import { GlobalContext } from "../../../../../../../../../../context/global-context"
import SuccessIndicator from "../../../../../../../../../../components/success-indicator/success-indicator"
import CharactersCounter from "../../../../../../../../../../components/characters-counter/characters-counter"
import "./main-image-item-control.scss"

const MainImageItemControl = (props) => {
    /* Global Variables */
    const {
        globals,
        setPopup,
        setAction
    } = useContext(GlobalContext)

    /* Locale Variables */
    const [typeLimit] = useState(() => {
        const imageMaxData = globals.find(item => item.type === "images")
        return imageMaxData.data.comment.typeLimit
    })

    /* Functions */
    const clickDelete = () => {
        props.setDeleteConfirmation(true)
    }

    const clickCrop = () => {
        setAction({
            imageIndex: props.imageIndex
        })
        setPopup("crop-image")
    }

    /* JSX Output */
    return (
        <div className="main-image-item-control-container">
            <div className="title-container">
                <p className="title">Comment:</p>
                <SuccessIndicator
                    isActive={props.indicateUpdateSuccess}/>
            </div>
            <CharactersCounter
                isActive={true}
                typeLimit={typeLimit}
                value={props.charactersLength}
                callBack={props.setStopTyping}/>
            <div
                onClick={() => clickCrop()}
                className="main-image-item-button-container">
                <div className="icon-container">
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 10V90H90V10H10ZM80 80H20V20H80V80Z" fill="black"/>
                        <path d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z" fill="black"/>
                        <path d="M85 30C93.2843 30 100 23.2843 100 15C100 6.71573 93.2843 0 85 0C76.7157 0 70 6.71573 70 15C70 23.2843 76.7157 30 85 30Z" fill="black"/>
                        <path d="M85 100C93.2843 100 100 93.2843 100 85C100 76.7157 93.2843 70 85 70C76.7157 70 70 76.7157 70 85C70 93.2843 76.7157 100 85 100Z" fill="black"/>
                        <path d="M15 100C23.2843 100 30 93.2843 30 85C30 76.7157 23.2843 70 15 70C6.71573 70 0 76.7157 0 85C0 93.2843 6.71573 100 15 100Z" fill="black"/>
                    </svg>
                </div>
                <p>Crop</p>
            </div>
            <div
                onClick={() => clickDelete()}
                className="main-image-item-button-container">
                <div className="icon-container">
                    <svg width="70" height="93" viewBox="0 0 70 93" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_213_14)">
                            <path d="M55.7099 87.55C55.2999 90.39 52.8699 92.5 49.9999 92.5H19.9999C17.1299 92.5 14.6999 90.39 14.2899 87.55L5.93991 29.08C5.43991 25.61 8.13991 22.5 11.6499 22.5H58.3499C61.8599 22.5 64.5499 25.61 64.0599 29.08L55.7099 87.55Z" fill="black"/>
                            <path d="M65 7.5H42.5C41.12 7.5 40 6.38 40 5C40 2.24 37.76 0 35 0C32.24 0 30 2.24 30 5C30 6.38 28.88 7.5 27.5 7.5H5C2.24 7.5 0 9.74 0 12.5C0 15.26 2.24 17.5 5 17.5H65C67.76 17.5 70 15.26 70 12.5C70 9.74 67.76 7.5 65 7.5Z" fill="black"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_213_14">
                                <rect width="70" height="92.5" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <p>Delete</p>
            </div>
        </div>
    )
}

export default MainImageItemControl
