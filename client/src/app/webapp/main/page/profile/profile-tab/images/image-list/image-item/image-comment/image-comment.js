import React, { useState, useEffect, useContext } from "react"
import { GlobalContext } from "../../../../../../../../../../context/global-context"
import InputTextArea from "../../../../../../../../../../components/input-text-area/input-text-area"
import SuccessIndicator from "../../../../../../../../../../components/success-indicator/success-indicator"
import Button from "../../../../../../../../../../components/button/button"
import "./image-comment.scss"

const ImageComment = (props) => {
    /* Global Variables */
    const {
        user,
        setUser
    } = useContext(GlobalContext)

    /* Locale Variables */
    const [comment, setComment] = useState(props.image.comment)
    const [loading, setLoading] = useState(false)
    const [indicateSuccess, setIndicateSuccess] = useState(false)
    const [textAreaBlur, setTextAreaBlur] = useState(false)
    const [reset, setReset] = useState(false)

    /* Triggers */
    useEffect(() => {
        if (textAreaBlur) {
            setTextAreaBlur(false)
            saveNewValue()
        }
    }, [textAreaBlur])

    /* Functions */
    const successIndicator = () => {
        setIndicateSuccess(true)
        setTimeout(() => {
            setIndicateSuccess(false)
        }, 2000)
    }

    const handleData = (data) => {
        setReset(false)
        setLoading(false)
        successIndicator()
        const images = user.images.map(image => {
            if (image.key === data.key) {
                return data
            } else {
                return image
            }
        })
        setUser(prevState => {
            return {
                ...prevState,
                images
            }
        })
    }

    const handleErr = () => {
    //     setReset(true)
    //     setLoading(false)
    }

    const saveNewValue = async () => {
        setReset(false)
        setLoading(true)
        try {
            const token = window.localStorage.getItem("token")
            const res = await fetch(`/profile-images/update-comment/${props.image.smallKey}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token,
                    comment
                })
            })
            const data = await res.json()
            handleData(data)
        } catch (err) {
            handleErr(err)
        }
    }

    /* JSX Output */
    return (
        <div className={"image-comment-container " + (loading ? "loading" : "")}>
            <div className="title-container">
                <p>Comment:</p>
                <SuccessIndicator
                    isActive={indicateSuccess}/>
            </div>
            <div className="input-container">
                <Button
                    value={"Delete"}
                    loading={false}
                    isActive={true}
                    callback={props.setDeleteConfirmation}/>
                <InputTextArea
                    typeLimit={100}
                    value={comment}
                    reset={reset}
                    resetValue={comment}
                    blurCallback={setTextAreaBlur}
                    valueCallback={setComment}/>
            </div>
        </div>
    )
}

export default ImageComment
