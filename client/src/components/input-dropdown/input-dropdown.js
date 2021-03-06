import React, { useEffect, useRef, useState } from "react"
import Dropdown from "../dropdown/dropdown"
import "./input-dropdown.scss"

const InputDropdown = (props) => {
    /* Locale Variables */
    const [placeholder] = useState(props.placeholder || "")
    const [value, setValue] = useState(props.value || "")
    const [string, setString] = useState(props.value || "")
    const [array, setArray] = useState(props.array || [])
    const [active, setActive] = useState(false)
    const [keyDownEvent, setKeyDownEvent] = useState({})
    const inputDropdownRef = useRef()
    const inputDropdownContainerRef = useRef()

    /* Triggers */
    useEffect(() => {
        reset()
    }, [props.array])

    useEffect(() => {
        setValue(props.value)
        updateArray()
    }, [props.value])

    useEffect(() => {
        updateArray(string)
    }, [string])

    /* Functions */
    const reset = () => {
        setArray(props.array)
        inputDropdownRef.current.innerText = props.value || ""
        props.valueCallback(props.value || "")
        setValue(props.value || "")
        setString(props.value || "")
        setActive(false)
    }

    const getNewArray = (string) => {
        return new Promise(resolve => {
            if (!string) {
                resolve(props.array)
            } else {
                // eslint-disable-next-line array-callback-return
                const newArray = props.array.filter(item => {
                    const splitItem = item.toLowerCase().split("")
                    const splitString = string.toLowerCase().split("")
                    for (let i = 0; i < splitString.length; i++) {
                        if (splitItem[i] === splitString[i]) {
                            if (i === splitString.length - 1) {
                                return item
                            }
                        } else {
                            // eslint-disable-next-line array-callback-return
                            return
                        }
                    }
                })
                resolve(newArray)
            }
        })
    }

    const updateArray = async (string) => {
        const newArray = await getNewArray(string)
        setArray(newArray)
    }

    const handleInput = (e) => {
        setString(e.target.innerText)
    }

    const handleFocus = () => {
        setActive(true)
    }

    const handleBlur = () => {
        setActive(false)
        inputDropdownRef.current.innerText = value
    }

    const handlePaste = (e) => {
        e.preventDefault()
    }

    const tryString = (string) => {
        return new Promise(resolve => {
            const selectedValue = props.array.find(item => item.toLowerCase() === string.toLocaleString())
            if (selectedValue) {
                resolve(selectedValue)
            } else {
                resolve(false)
            }
        })
    }

    const handleKeyDown = async (e) => {
        switch (e.key) {
        case "Enter":
            e.preventDefault()
            // eslint-disable-next-line no-case-declarations
            const selectedValue = await tryString(string)
            if (selectedValue) {
                updateValue(selectedValue)
            } else {
                setKeyDownEvent(e)
            }
            break
        default:
            setKeyDownEvent(e)
        }
    }

    const updateValue = (callBackValue) => {
        if (callBackValue === value) {
            inputDropdownRef.current.innerText = value
            setString(value)
            setActive(false)
            inputDropdownRef.current.blur()
        } else {
            props.valueCallback(callBackValue)
            setActive(false)
            inputDropdownRef.current.blur()
        }
    }

    /* JSX Output */
    return (
        <div
            tabIndex={-1}
            ref={inputDropdownContainerRef}
            onFocus={(e) => handleFocus(e)}
            onBlur={() => handleBlur()}
            className={"input-dropdown-container " + (active ? "active " : "") + (props.isActive ? "" : "lock ") + (props.loading ? "loading " : "")}>
            <p
                ref={inputDropdownRef}
                className="input-dropdown"
                contentEditable={props.loading || !props.isActive ? "false" : "true"}
                suppressContentEditableWarning={true}
                onInput={(e) => handleInput(e)}
                onKeyDown={(e) => handleKeyDown(e)}
                onPaste={(e) => handlePaste(e)}
            >{value}</p>
            <p className={"placeholder " + (active || value ? "hide" : "")}>{placeholder}</p>
            <div className={"indicator-container"}>
            </div>
            <Dropdown
                currentString={string}
                inView={5}
                isActive={active}
                keyDownEvent={keyDownEvent}
                array={array}
                valueCallback={updateValue}/>
        </div>
    )
}

export default InputDropdown
