import React, { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../../../../../../../context/global-context"
import SuccessIndicator from "../../../../../../../../components/success-indicator/success-indicator"
import InputTextArea from "../../../../../../../../components/input-text-area/input-text-area"
import "./edit-about.scss"

const EditAbout = () => {
    /* Global Variables */
    const {
        details,
        setDetails
    } = useContext(GlobalContext)

    /* Locale Variables */
    const [about, setAbout] = useState("")
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
        setDetails(prevState => {
            return { ...prevState, about: data.about }
        })
        setLoading(false)
        successIndicator()
    }

    const handleErr = () => {
        setReset(true)
        setLoading(false)
    }

    const saveNewValue = async () => {
        setReset(false)
        setLoading(true)
        try {
            const token = window.localStorage.getItem("token")
            const res = await fetch("/profile-details/update-about", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token,
                    about
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
        <div className={"edit-about-container " + (loading ? "loading" : "")}>
            <div className="title-container">
                <h2>About {details.name}</h2>
                <SuccessIndicator
                    isActive={indicateSuccess}/>
            </div>
            <div className="input-container">
                <InputTextArea
                    reset={reset}
                    resetValue={details.about}
                    blurCallback={setTextAreaBlur}
                    valueCallback={setAbout}/>
            </div>
        </div>
    )
}

export default EditAbout
