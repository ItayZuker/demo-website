import React, { useState } from "react"
import ImageList from "./image-list/image-list"
import UploadImages from "./upload-images/upload-images"
import "./images.scss"

const Images = () => {
    /* Locale State */
    const [loadingIndex, setLoadingIndex] = useState(null)

    /* JSX Output */
    return (
        <div className="images-container">
            <ImageList loadingIndex={loadingIndex} setLoadingIndex={setLoadingIndex}/>
            <UploadImages setLoadingIndex={setLoadingIndex}/>
        </div>
    )
}

export default Images
