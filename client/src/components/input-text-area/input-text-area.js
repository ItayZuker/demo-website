import React, { useState, useEffect } from "react"
import CharactersCounter from "../characters-counter/characters-counter"
import "./input-text-area.scss"

const InputTextArea = (props) => {
    /* Locale Variables */
    const [value, setValue] = useState(props.value || "")
    const [typeLimit, setTypeLimit] = useState(false)

    /* Triggers */
    useEffect(() => {
        if (props.reset) {
            setValue(props.resetValue)
        }
    }, [props.reset])

    useEffect(() => {
        props.valueCallback(value)
    }, [value])

    /* Functions */
    const handleKeyPress = (e) => {
        if (typeLimit) {
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
            {props.typeLimit
                ? <CharactersCounter
                    isActive={!!props.typeLimit}
                    value={value.length}
                    topLimit={props.typeLimit}
                    callBack={setTypeLimit}/>
                : <></>
            }

        </div>
    )
}

export default InputTextArea
