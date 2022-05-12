import React, { useEffect, useState } from "react"
import DeleteImageConfirmation from "./delete-image-confirmation/delete-image-confirmation"
import "./image-item.scss"

const ImageItem = (props) => {
    /* Locale Variables */
    const [imageSrc, setImageSrc] = useState(null)
    const [clickDelete, setClickDelete] = useState(false)
    const [imageKey, setImageKey] = useState("")

    /* Triggers */
    useEffect(() => {
        getImage(props.imageKey)
    }, [])

    /* Functions */
    const getBase64String = (bufferData) => {
        bufferData = new Uint8Array(bufferData)
        return btoa(
            bufferData.reduce((data, byte) => data + String.fromCharCode(byte), "")
        )
    }

    const handleData = (data) => {
        const base64String = getBase64String(data.buffer.data)
        setImageSrc(`data:image/jpeg;base64,${base64String}`)
        setImageKey(data.key)
    }

    const handelErr = () => {
    }

    const getImage = async (key) => {
        try {
            const token = window.localStorage.getItem("token")
            const res = await fetch(`/profile-images/get-image/${key}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token
                })
            })
            const data = await res.json()
            handleData(data)
        } catch (err) {
            handelErr()
        }
    }

    const clickDeleteImage = () => {
        if (clickDelete) {
            setClickDelete(false)
        } else {
            setClickDelete(true)
        }
    }

    /* JSX Output */
    if (!imageSrc) {
        return <></>
    } else {
        return (
            <div className="image-item-container">
                { clickDelete ? <DeleteImageConfirmation setClickDelete={setClickDelete} imageKey={imageKey}/> : <></> }
                <div
                    onClick={() => clickDeleteImage()}
                    className="close-icon-container">
                    <svg width="91" height="91" viewBox="0 0 91 91" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M62.9901 41.8601L87.7801 17.0701C91.6901 13.1601 91.6901 6.83006 87.7801 2.93006C83.8701 -0.979941 77.5401 -0.979941 73.6401 2.93006L48.8501 27.7201C46.9201 29.6501 43.7901 29.6501 41.8601 27.7201L17.0701 2.93006C13.1601 -0.979941 6.83006 -0.979941 2.93006 2.93006C-0.979941 6.84006 -0.979941 13.1701 2.93006 17.0701L27.7201 41.8601C29.6501 43.7901 29.6501 46.9201 27.7201 48.8501L2.93006 73.6401C-0.979941 77.5501 -0.979941 83.8801 2.93006 87.7801C6.84006 91.6901 13.1701 91.6901 17.0701 87.7801L41.8601 62.9901C43.7901 61.0601 46.9201 61.0601 48.8501 62.9901L73.6401 87.7801C77.5501 91.6901 83.8801 91.6901 87.7801 87.7801C91.6901 83.8701 91.6901 77.5401 87.7801 73.6401L62.9901 48.8501C61.0601 46.9201 61.0601 43.7901 62.9901 41.8601Z" fill="black"/>
                    </svg>
                </div>
                <img
                    alt="Image"
                    src={ imageSrc } />
            </div>
        )
    }
}

export default ImageItem
