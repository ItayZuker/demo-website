import React, { useContext, useState } from "react"
import { GlobalContext } from "../../../../../../../../../../context/global-context"
import SuccessIndicator from "../../../../../../../../../../components/success-indicator/success-indicator"
import CharactersCounter from "../../../../../../../../../../components/characters-counter/characters-counter"
import "./main-image-item-control.scss"

const MainImageItemControl = (props) => {
    /* Global Variables */
    const {
        globals
    } = useContext(GlobalContext)

    /* Locale Variables */
    const [typeLimit] = useState(() => {
        const imageMaxData = globals.find(item => item.type === "images")
        return imageMaxData.data.comment.typeLimit
    })

    /* Functions */
    const clickDelete = () => {
        console.log(123)
        props.setDeleteConfirmation(true)
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
            <div className="main-image-item-button-container">
                <p>Crop</p>
            </div>
            <div
                onClick={() => clickDelete()}
                className="main-image-item-button-container">
                <p>Delete</p>
            </div>
        </div>
    )
}

export default MainImageItemControl
