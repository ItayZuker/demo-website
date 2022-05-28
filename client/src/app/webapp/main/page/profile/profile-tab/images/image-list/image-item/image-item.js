import React, { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../../../../../../../../context/global-context"
import Loading from "../../../../../../../../../components/loading/loading"
import ImageComment from "./image-comment/image-comment"
import DeleteImageConfirmation from "./delete-image-confirmation/delete-image-confirmation"
import "./image-item.scss"

const ImageItem = (props) => {
    /* Global Variables */
    const {
        user,
        setPopup
    } = useContext(GlobalContext)

    /* Locale Variables */
    const [grabbing, setGrabbing] = useState(false)
    const [imageSrc, setImageSrc] = useState(null)
    const [loading, setLoading] = useState(false)
    const [deleteConfirmation, setDeleteConfirmation] = useState()

    /* Triggers */
    useEffect(() => {
        updateProfileSrc()
    }, [user.images[props.index].key])

    useEffect(() => {
        if (!props.dragging) {
            setGrabbing(false)
        }
    }, [props.dragging])

    /* Functions */
    const updateProfileSrc = async () => {
        setLoading(true)
        const res = await fetch(`/profile-images/get-image/${user.images[props.index].key}`)
        const blob = await res.blob()
        const src = await URL.createObjectURL(blob)
        setImageSrc(src)
        setLoading(false)
    }

    const openGallery = () => {
        setPopup("my-gallery")
    }

    const mouseDownOnHandle = () => {
        setGrabbing(true)
    }

    const mouseUpOnHandle = () => {
        setGrabbing(false)
    }

    /* JSX Output */
    return (
        <div className={"image-item-container " + (grabbing ? "grabbing" : "")}>
            { deleteConfirmation
                ? <DeleteImageConfirmation
                    setDeleteConfirmation={setDeleteConfirmation}
                    imageIndex={props.index}/>
                : <></> }
            <div
                onClick={() => openGallery()}
                className="image-container">
                <Loading loading={loading}/>
                <div className="icon-container">
                    <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_209_2)">
                            <path d="M107.07 92.93L91.69 77.59C96.94 69.68 100 60.2 100 50C100 22.39 77.61 0 50 0C22.39 0 0 22.39 0 50C0 77.61 22.39 100 50 100C60.2 100 69.68 96.94 77.59 91.69L92.93 107.07C96.84 110.98 103.17 110.98 107.07 107.07C110.98 103.16 110.98 96.83 107.07 92.93V92.93ZM50 80C33.43 80 20 66.57 20 50C20 33.43 33.43 20 50 20C66.57 20 80 33.43 80 50C80 54.65 78.94 59.06 77.05 62.99C74.1 69.12 69.12 74.1 62.99 77.05C59.06 78.94 54.65 80 50 80Z" fill="black"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_209_2">
                                <rect width="110" height="110" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <img
                    src={imageSrc}
                    alt="Image"/>
            </div>
            <div className="comment-container">
                <ImageComment
                    setDeleteConfirmation={setDeleteConfirmation}
                    image={user.images[props.index]}/>
            </div>
            <div
                onMouseDown={() => mouseDownOnHandle()}
                onMouseUp={() => mouseUpOnHandle()}
                className="handle-container handle"
                {...props.provided.dragHandleProps}>
                <svg width="100" height="220" viewBox="0 0 100 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40C31.0457 40 40 31.0457 40 20Z" fill="black"/>
                    <path d="M40 200C40 188.954 31.0457 180 20 180C8.9543 180 0 188.954 0 200C0 211.046 8.9543 220 20 220C31.0457 220 40 211.046 40 200Z" fill="black"/>
                    <path d="M40 140C40 128.954 31.0457 120 20 120C8.9543 120 0 128.954 0 140C0 151.046 8.9543 160 20 160C31.0457 160 40 151.046 40 140Z" fill="black"/>
                    <path d="M40 80C40 68.9543 31.0457 60 20 60C8.9543 60 0 68.9543 0 80C0 91.0457 8.9543 100 20 100C31.0457 100 40 91.0457 40 80Z" fill="black"/>
                    <path d="M100 20C100 8.9543 91.0457 0 80 0C68.9543 0 60 8.9543 60 20C60 31.0457 68.9543 40 80 40C91.0457 40 100 31.0457 100 20Z" fill="black"/>
                    <path d="M100 200C100 188.954 91.0457 180 80 180C68.9543 180 60 188.954 60 200C60 211.046 68.9543 220 80 220C91.0457 220 100 211.046 100 200Z" fill="black"/>
                    <path d="M100 140C100 128.954 91.0457 120 80 120C68.9543 120 60 128.954 60 140C60 151.046 68.9543 160 80 160C91.0457 160 100 151.046 100 140Z" fill="black"/>
                    <path d="M100 80C100 68.9543 91.0457 60 80 60C68.9543 60 60 68.9543 60 80C60 91.0457 68.9543 100 80 100C91.0457 100 100 91.0457 100 80Z" fill="black"/>
                </svg>
            </div>
        </div>
    )
}

export default ImageItem
