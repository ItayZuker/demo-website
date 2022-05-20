import React, { useState, useEffect, useContext } from "react"
import { GlobalContext } from "../../../../../../../../../../context/global-context"
import Button from "../../../../../../../../../../components/button/button"
import "./delete-image-confirmation.scss"

const DeleteImageConfirmation = (props) => {
    /* Global Variables */
    const {
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
            props.setDeleteClick(false)
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
        // props.setLoadingIndex(null)
        props.setClickDelete(false)
    }

    const handleError = () => {
        props.setLoadingIndex(null)
        /* TODO: Indicate that something went wrong */
    }

    const deleteImage = async () => {
        try {
            props.setLoadingIndex(props.imageIndex)
            const token = window.localStorage.getItem("token")
            const res = await fetch(`/profile-images/delete-image/${props.imageKey}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token
                })
            })
            const data = await res.json()
            console.log(111)
            console.log(data)
            handleData(data)
        } catch (err) {
            console.log(222)
            console.log(err)
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
