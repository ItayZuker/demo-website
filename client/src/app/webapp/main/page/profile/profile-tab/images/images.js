import React, { useContext, useState } from "react"
import { GlobalContext } from "../../../../../../../context/global-context"
import ImageList from "./image-list/image-list"
import "./images.scss"

const Images = () => {
    /* Global Variables */
    const {
        user,
        globals
    } = useContext(GlobalContext)

    /* Locale Variables */
    const [imageMax] = useState(() => {
        const imageMaxData = globals.find(item => item.type === "images")
        return imageMaxData.data.maxImages
    })
    const [loadingIndex, setLoadingIndex] = useState(null)

    /* JSX Output */
    return (
        <div className="images-container">
            <h2>You have {user.images.length} / {imageMax} Images</h2>
            <ImageList loadingIndex={loadingIndex} setLoadingIndex={setLoadingIndex}/>
        </div>
    )
}

export default Images
