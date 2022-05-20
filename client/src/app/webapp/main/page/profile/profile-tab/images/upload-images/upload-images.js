import React, { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../../../../../../../context/global-context"
import Button from "../../../../../../../../components/button/button"
import "./upload-images.scss"

const UploadImages = (props) => {
    /* Global Variables */
    const {
        user,
        setUser,
        globals
    } = useContext(GlobalContext)

    /* Locale Variables */
    const [imageMax] = useState(() => {
        const imageMaxData = globals.find(item => item.type === "imageMax")
        return imageMaxData.list.find(item => item.type === "max").value
    })
    const [uploadClick, setUploadClick] = useState(false)
    const [loading, setLoading] = useState(false)

    /* Triggers */
    useEffect(() => {
        if (uploadClick) {
            document.getElementById("image-input-id").click()
            setUploadClick(false)
        }
    }, [uploadClick])

    /* Functions */
    const cleanImageInput = () => {
        document.getElementById("image-input-id").value = null
    }

    const handleData = (data) => {
        cleanImageInput()
        if (data.images) {
            setUser(prevState => {
                return {
                    ...prevState,
                    images: data.images
                }
            })
        }
        setLoading(false)
        props.setLoadingIndex(null)
    }

    const handleErr = () => {
        cleanImageInput()
        setLoading(false)
        props.setLoadingIndex(null)
        /* TODO: Something went wrong, please try again */
    }

    const getImage = () => {
        return new Promise((resolve, reject) => {
            const files = document.getElementById("image-input-id").files
            if (files.length > 0) {
                resolve(files[0])
            } else {
                reject(new Error("No file selected"))
            }
        })
    }

    const uploadFile = async () => {
        try {
            setLoading(true)
            props.setLoadingIndex(user.images.length)
            const image = await getImage()
            if (image) {
                const token = window.localStorage.getItem("token")
                const formData = new FormData()
                formData.append("token", token)
                formData.append("image", image)
                const res = await fetch("/profile-images/upload", {
                    method: "post",
                    body: formData
                })
                const data = await res.json()
                handleData(data)
            }
        } catch (err) {
            handleErr()
        }
    }

    /* JSX Output */
    return (
        <div className="upload-images-container">
            <div className="image-control-inner-container">
                <h2>You have {user.images.length} / {imageMax} Images</h2>
                <input
                    className="image"
                    type="file"
                    id="image-input-id"
                    accept="image/png, image/jpeg"
                    onChange={() => uploadFile()}/>
                <Button
                    loading={loading}
                    isActive={user.images.length < imageMax}
                    value="Upload image"
                    callback={setUploadClick}/>
            </div>
        </div>
    )
}

export default UploadImages
