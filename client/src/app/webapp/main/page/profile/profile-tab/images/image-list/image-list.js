import React, { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../../../../../../../context/global-context"
import ImageItem from "./image-item/image-item"
import "./image-list.scss"

const ImageList = () => {
    /* Global Variables */
    const {
        details
    } = useContext(GlobalContext)

    /* Locale Variables */
    const [images, setImages] = useState(details.images || [])

    useEffect(() => {
        setImages(details.images || [])
    }, [details.images])

    /* JSX Output */
    return (
        <div className="image-list-container">
            {images.map((key, index) => {
                return <ImageItem key={index} imageKey={key}/>
            })}
        </div>
    )
}

export default ImageList
