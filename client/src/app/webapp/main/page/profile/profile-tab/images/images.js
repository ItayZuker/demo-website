import React, { useEffect, useState, useContext } from "react"
import { GlobalContext } from "../../../../../../../context/global-context"
import DragAndDrop from "./drag-and-drop/drag-and-drop"
import Button from "../../../../../../../components/button/button"
import ImageList from "./image-list/image-list"
import "./images.scss"

const Images = () => {
    /* Global Variables */
    const {
        setDetails
    } = useContext(GlobalContext)

    /* Locale Variables */
    const [image, setImage] = useState(null)
    const [clickSave, setClickSave] = useState(false)
    const [loading, setLoading] = useState(false)

    /* Triggers */
    useEffect(() => {
        if (clickSave) {
            setLoading(true)
            saveImage()
        }
    }, [clickSave])

    /* Functions */
    const handleErr = () => {
        setClickSave(false)
        setLoading(false)
    }

    const handleData = (data) => {
        setDetails(prevState => {
            return {
                ...prevState,
                images: data.images
            }
        })
        setClickSave(false)
        setLoading(false)
    }

    const saveImage = async () => {
        try {
            const token = window.localStorage.getItem("token")
            const formData = new FormData()
            formData.append("token", token)
            formData.append("image", image)
            const res = await fetch("/profile-images/save", {
                method: "post",
                body: formData
            })
            const data = await res.json()
            handleData(data)
        } catch (err) {
            handleErr()
        }
    }

    /* JSX Output */
    return (
        <div className="images-container">
            <p>Edit Picture</p>
            <DragAndDrop setImage={setImage}/>
            <Button
                isActive={!!image}
                loading={loading}
                callback={setClickSave}
                value="Save"/>
            <ImageList />
        </div>
    )
}

export default Images
