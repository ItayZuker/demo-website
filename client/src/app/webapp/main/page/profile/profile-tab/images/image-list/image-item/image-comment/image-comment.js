import React, { useState, useEffect, useContext } from "react"
import { GlobalContext } from "../../../../../../../../../../context/global-context"
import InputTextArea from "../../../../../../../../../../components/input-text-area/input-text-area"
import "./image-comment.scss"

const ImageComment = (props) => {
    /* Global Variables */
    const {
        user,
        setUser,
        globals
    } = useContext(GlobalContext)

    /* Locale Variables */
    const [comment, setComment] = useState(props.image.comment)
    const [loading, setLoading] = useState(false)
    const [textAreaBlur, setTextAreaBlur] = useState(false)
    const [reset, setReset] = useState(false)
    const [typeLimit] = useState(() => {
        const imageMaxData = globals.find(item => item.type === "images")
        return imageMaxData.data.comment.typeLimit
    })

    /* Triggers */
    useEffect(() => {
        props.setCharactersLength(comment.length)
    }, [comment])

    useEffect(() => {
        if (textAreaBlur) {
            setTextAreaBlur(false)
            saveNewValue()
        }
    }, [textAreaBlur])

    /* Functions */
    const successIndicator = () => {
        props.setIndicateUpdateSuccess(true)
        setTimeout(() => {
            props.setIndicateUpdateSuccess(false)
        }, 2000)
    }

    const handleData = (data) => {
        setReset(false)
        setLoading(false)
        successIndicator()
        const images = user.images.map(image => {
            if (image.smallKey === data.imageItem.smallKey) {
                return data.imageItem
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
            <div className="input-container">
                <InputTextArea
                    typeLimit={typeLimit}
                    stopTyping={props.stopTyping}
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
