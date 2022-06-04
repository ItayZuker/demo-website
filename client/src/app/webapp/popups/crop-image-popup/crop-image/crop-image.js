import React, { useContext, useState, useEffect } from "react"
import { GlobalContext } from "../../../../../context/global-context"
import ReactCrop from "react-image-crop"
import Button from "../../../../../components/button/button"
import Loading from "../../../../../components/loading/loading"
import "react-image-crop/dist/ReactCrop.css"
import "./crop-image.scss"

const CropImage = () => {
    /* Global Variables */
    const {
        setPopup,
        action,
        user,
        setUser
    } = useContext(GlobalContext)

    /* Triggers */
    useEffect(() => {
        updateImageSrc()
    }, [])

    /* Locale Variables */
    const [imageSrc, setImageSrc] = useState(null)
    const [loading, setLoading] = useState(false)
    const [crop, setCrop] = useState({
        unit: "%", // Can be 'px' or '%'
        x: 0,
        y: 0,
        width: 50,
        height: 50
    })

    /* Functions */
    const updateImageSrc = async () => {
        setLoading(true)
        const res = await fetch(`/profile-images/get-image/${user.images[action.imageIndex].originalKey}`)
        const blob = await res.blob()
        const src = await URL.createObjectURL(blob)
        setImageSrc(src)
        setLoading(false)
    }

    const handleChange = (c, p) => {
        setCrop(p)
    }

    const clickCrop = () => {
        setLoading(true)
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        const image = new Image()
        image.src = imageSrc
        canvas.width = 300
        canvas.height = 300
        image.onload = () => {
            const wCutOriginal = image.naturalWidth / 100 * crop.width
            const hCutOriginal = image.naturalHeight / 100 * crop.height
            const xStart = image.naturalWidth / 100 * crop.x
            const yStart = image.naturalHeight / 100 * crop.y
            ctx.drawImage(image, xStart, yStart, wCutOriginal, hCutOriginal, 0, 0, canvas.width, canvas.height)
            // const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            updateCropImage(canvas)
        }
    }

    const handleErr = () => {
        setLoading(false)
        /* TODO: Something went wrong */
    }

    const handleData = (data) => {
        setUser(prevState => {
            return {
                ...prevState,
                images: data.images
            }
        })
        setPopup("")
    }

    const updateCropImage = async (canvas) => {
        try {
            const dataURL = canvas.toDataURL()
            const test = await fetch(dataURL)
            const blob = await test.blob()
            const file = new File([blob], "image-crop.jpg", { type: "image/jpeg" })
            const token = window.localStorage.getItem("token")
            const formData = new FormData()
            formData.append("token", token)
            formData.append("image", file)
            formData.append("imageIndex", action.imageIndex)
            const res = await fetch("/profile-images/crop-image", {
                method: "put",
                body: formData
            })
            const data = await res.json()
            handleData(data)
        } catch (err) {
            handleErr()
        }
    }

    /* JSX Output */
    if (loading) {
        return <Loading loading={loading}/>
    } else {
        return (
            <div className="crop-image-container">
                <div className="crop-container">
                    <div className="top-container">
                        <div
                            onClick={() => setPopup("")}
                            className="close-icon-container">
                            <svg width="91" height="91" viewBox="0 0 91 91" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M62.9901 41.8601L87.7801 17.0701C91.6901 13.1601 91.6901 6.83006 87.7801 2.93006C83.8701 -0.979941 77.5401 -0.979941 73.6401 2.93006L48.8501 27.7201C46.9201 29.6501 43.7901 29.6501 41.8601 27.7201L17.0701 2.93006C13.1601 -0.979941 6.83006 -0.979941 2.93006 2.93006C-0.979941 6.84006 -0.979941 13.1701 2.93006 17.0701L27.7201 41.8601C29.6501 43.7901 29.6501 46.9201 27.7201 48.8501L2.93006 73.6401C-0.979941 77.5501 -0.979941 83.8801 2.93006 87.7801C6.84006 91.6901 13.1701 91.6901 17.0701 87.7801L41.8601 62.9901C43.7901 61.0601 46.9201 61.0601 48.8501 62.9901L73.6401 87.7801C77.5501 91.6901 83.8801 91.6901 87.7801 87.7801C91.6901 83.8701 91.6901 77.5401 87.7801 73.6401L62.9901 48.8501C61.0601 46.9201 61.0601 43.7901 62.9901 41.8601Z" fill="black"/>
                            </svg>
                        </div>
                    </div>
                    <div className="inner-crop-container">
                        <ReactCrop
                            aspect={1}
                            crop={crop}
                            onChange={(c, p) => handleChange(c, p)}>
                            <img src={imageSrc} alt={"Preview crop image"}/>
                        </ReactCrop>
                    </div>
                    <div className="bottom-container">
                        <Button
                            loading={false}
                            isActive={true}
                            value={"Crop"}
                            callback={() => clickCrop()}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default CropImage
