import React, { useState, useEffect } from "react"
import "./input-text-area.scss"

const InputTextArea = (props) => {
    /* Locale Variables */
    const [value, setValue] = useState(props.value || "")
    const [stopTyping, setStopTyping] = useState(false)

    /* Triggers */
    useEffect(() => {
        if (props.reset) {
            setValue(props.resetValue)
        }
    }, [props.reset])

    useEffect(() => {
        props.valueCallback(value)
    }, [value])

    useEffect(() => {
        if (props.stopTyping) {
            setStopTyping(true)
        } else {
            setStopTyping(false)
        }
    }, [props.stopTyping])
    /* Functions */
    const handleKeyPress = (e) => {
        if (stopTyping) {
            e.preventDefault()
        }
    }

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handlePast = async (e) => {
        if (props.typeLimit) {
            e.preventDefault()
            const currentText = e.target.value
            const clipboard = await navigator.clipboard.readText()
            const length = currentText.length + clipboard.length
            if (length > props.typeLimit) {
                const clipboardCut = clipboard.slice(0, (props.typeLimit - currentText.length))
                setValue(currentText + clipboardCut)
            } else {
                setValue(currentText + clipboard)
            }
        }
    }

    const handleBlur = () => {
        if (props.blurCallback) {
            props.blurCallback(true)
        }
    }

    /* JSX Output */
    return (
        <div className={"input-text-area-container " + (props.loading ? "loading" : "")}>
            <textarea
                placeholder={"Write here..."}
                value={value}
                onBlur={() => handleBlur()}
                onPaste={(e) => handlePast(e)}
                onKeyPress={(e) => handleKeyPress(e)}
                onChange={(e) => handleChange(e)} />
        </div>
    )
}

export default InputTextArea
