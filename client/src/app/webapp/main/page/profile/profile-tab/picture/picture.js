import React, { useEffect, useState } from "react"
import "./picture.scss"
import DragAndDrop from "./drag-and-drop/drag-and-drop"
import Button from "../../../../../../../components/button/button"

const Picture = () => {
    /* Locale Variables */
    const [image, setImage] = useState(null)
    const [clickSave, setClickSave] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (clickSave) {
            setLoading(true)
            saveImage()
        }
    }, [clickSave])

    const handleErr = () => {
        setClickSave(false)
        setLoading(false)
    }

    const handleData = (data) => {
        console.log(123)
        console.log(data)
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
        <div className="picture-container">
            <p>Edit Picture</p>
            <DragAndDrop setImage={setImage}/>
            <Button
                isActive={!!image}
                loading={loading}
                callback={setClickSave}/>
        </div>
    )
}

export default Picture
