import React, { useState, useEffect, useContext } from "react"
import { GlobalContext } from "../../../../../../../../../../context/global-context"
import Button from "../../../../../../../../../../components/button/button"
import "./delete-image-confirmation.scss"

const DeleteImageConfirmation = (props) => {
    /* Global Variables */
    const {
        user,
        setUser
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
            props.setDeleteConfirmation(null)
        }
    }, [clickNo])

    /* Functions */
    const handleData = (data) => {
        setUser(prevState => {
            return {
                ...prevState,
                images: data.images
            }
        })
        props.setDeleteConfirmation(null)
    }

    const handleError = () => {
        /* TODO: Indicate that something went wrong */
    }

    const deleteImage = async () => {
        try {
            // props.setLoadingIndex(props.imageIndex)
            const token = window.localStorage.getItem("token")
            const res = await fetch(`/profile-images/delete-image/${user.images[props.imageIndex].key}`, {
                method: "DELETE",
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
