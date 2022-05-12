import React, { useState, useEffect, useContext } from "react"
import { GlobalContext } from "../../../../../../../../../../context/global-context"
import Button from "../../../../../../../../../../components/button/button"
import "./delete-image-confirmation.scss"

const DeleteImageConfirmation = (props) => {
    /* Global Variables */
    const {
        setDetails
    } = useContext(GlobalContext)

    /* Locale Variables */
    const [clickYes, setClickYes] = useState(false)
    const [clickNo, setClickNo] = useState(false)

    /* Triggers */
    useEffect(() => {
        if (clickYes) {
            deleteImage()
        }
    }, [clickYes])

    useEffect(() => {
        if (clickNo) {
            props.setClickDelete(false)
        }
    }, [clickNo])

    /* Functions */
    const handleData = (data) => {
        console.log(data)
        setDetails(prevState => {
            return {
                ...prevState,
                images: data.images
            }
        })
        props.setClickDelete(false)
    }

    const handleError = () => {
    }

    const deleteImage = async () => {
        try {
            const token = window.localStorage.getItem("token")
            const res = await fetch("/profile-images/delete-image", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token,
                    imageKey: props.imageKey
                })
            })
            const data = await res.json()
            handleData(data)
        } catch (err) {
            handleError()
        }
    }

    /* JSX Output */
    return (
        <div className="delete-image-confirmation-container">
            <p>Do you want to delete this image?</p>
            <div className="buttons-container">
                <Button
                    unique="yes"
                    callback={setClickYes}
                    loading={false}
                    isActive={true}
                    value="Yes"/>
                <Button
                    unique="no"
                    callback={setClickNo}
                    loading={false}
                    isActive={true}
                    value="No"/>

            </div>
        </div>
    )
}

export default DeleteImageConfirmation
