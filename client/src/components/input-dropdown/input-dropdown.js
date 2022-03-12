import React, {useEffect, useRef, useState} from "react";
import Dropdown from "../dropdown/dropdown";
import "./input-dropdown.scss";

const InputDropdown = (props) => {

    /* Locale Variables */
    const [value, setValue] = useState(props.value || '');
    const [string, setString] = useState(props.value || '');
    const [array, setArray] = useState(props.array || []);
    const [active, setActive] = useState(false);
    const [keyDownEvent, setKeyDownEvent] = useState({});
    const inputDropdownRef = useRef();

    /* Triggers */
    useEffect(() => {
        setArray(props.array);
    }, [props.array]);

    useEffect(() => {
        setValue(props.value);
        updateArray();
    }, [props.value]);

    useEffect(() => {
        updateArray(string);
    }, [string]);

    /* Functions */
    const getNewArray = (string) => {
        return new Promise(resolve => {
            if (!string) {
                resolve(props.array);
            } else {
                const newArray = props.array.filter(item => {
                    const splitItem = item.toLowerCase().split('');
                    const splitString = string.toLowerCase().split('');
                    for (let i = 0; i < splitString.length; i++) {
                        if (splitItem[i] === splitString[i]) {
                            if (i === splitString.length -1) {
                                return item;
                            }
                        } else {
                            return;
                        }
                    }
                });
                resolve(newArray);
            }
        });
    };

    const updateArray = async (string) => {
        const newArray = await getNewArray(string);
        setArray(newArray);
    };

    const handleInput = (e) => {
        setString(e.target.innerText);
    };

    const handleFocus = () => {
        setActive(true);
    };

    const handleBlur = () => {
        setActive(false);
    };

    const handlePaste = (e) => {
        e.preventDefault();
    };

    const handleKeyDown = (e) => {
        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                break;
        }
        setKeyDownEvent(e);
    };

    const updateValue = (callBackValue) => {
        if (callBackValue === value) {
            inputDropdownRef.current.innerText = value;
            setString(value);
            setActive(false);
            inputDropdownRef.current.blur();
        } else {
            props.valueCallback(callBackValue);
            setActive(false);
            inputDropdownRef.current.blur();
        }
    };

    /* JSX Output */
    return (
        <div
            tabIndex={-1}
            onFocus={() => handleFocus()}
            onBlur={() => handleBlur()}
            className='input-dropdown-container'>
            <p
                ref={inputDropdownRef}
                className='input-dropdown'
                contentEditable={props.loading ? 'false' : 'true'}
                suppressContentEditableWarning={true}
                onInput={(e) => handleInput(e)}
                onKeyDown={(e) => handleKeyDown(e)}
                onPaste={(e) => handlePaste(e)}
            >{value}</p>
            <Dropdown
                currentString={string}
                inView={5}
                isActive={active}
                keyDownEvent={keyDownEvent}
                array={array}
                valueCallback={updateValue}
            />
        </div>
    )
};

export default InputDropdown;