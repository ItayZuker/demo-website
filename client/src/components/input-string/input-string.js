import React, { useEffect, useRef, useState } from "react"
import "./input-string.scss"

const InputString = (props) => {
    /* Locale Variables */
    // const [typeLimit, setTypeLimit] = useState(false)
    const [value, setValue] = useState(props.value || "")
    const [tempValue, setTempValue] = useState(props.value || "")
    const valueRef = useRef()

    /* Triggers */
    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    useEffect(() => {
        props.valueCallback(tempValue)
    }, [tempValue])

    /* Functions */
    const handleInput = (e) => {
        setTempValue(e.target.innerText)
    }

    const handleBlur = () => {
        if (!tempValue) {
            resetValue()
        }
    }

    const resetValue = () => {
        setValue(props.value)
        valueRef.current.innerText = props.value
    }

    const handleKeyDown = (e) => {
        switch (e.key) {
        case "Backspace":
            break
        case "Enter":
            e.preventDefault()
            if (props.valueChanged) {
                props.submitCallback(true)
            }
            break
        case " ":
            e.preventDefault()
            break
        default:
            if (props.stopTyping) {
                e.preventDefault()
            }
        }
    }

    const handlePast = async (e) => {
        if (props.typeLimit) {
            e.preventDefault()
            const clipboard = await navigator.clipboard.readText()
            const clipboardWithoutSpaces = clipboard.replace(/\s+/g, "")
            const clipboardWithoutLineBreaks = clipboardWithoutSpaces.replace(/(\r\n|\n|\r)/gm, "")
            const length = tempValue.length + clipboardWithoutLineBreaks.length
            if (length > props.typeLimit) {
                const clipboardCut = clipboardWithoutLineBreaks.slice(0, (props.typeLimit - tempValue.length))
                setTempValue(tempValue + clipboardCut)
                valueRef.current.innerText = tempValue + clipboardCut
                valueRef.current.blur()
            } else {
                setTempValue(tempValue + clipboardWithoutLineBreaks)
                valueRef.current.innerText = tempValue + clipboardWithoutLineBreaks
                valueRef.current.blur()
            }
        }
    }

    /* JSX Output */
    return (
        <div className={"input-string-container " + (props.loading ? "loading" : "")}>
            <p
                ref={valueRef}
                className="input-string"
                contentEditable={props.loading ? "false" : "true"}
                suppressContentEditableWarning={true}
                onPaste={(e) => handlePast(e)}
                onInput={(e) => handleInput(e)}
                onKeyDown={(e) => handleKeyDown(e)}
                onBlur={() => handleBlur()}
            >{value}</p>
        </div>
    )
}

export default InputString
