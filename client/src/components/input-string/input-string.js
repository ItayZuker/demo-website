import React, {useEffect, useRef, useState} from "react";
import CharactersCounter from "../characters-counter/characters-counter";
import "./input-string.scss";

const InputString = (props) => {

    const [typeLimit, setTypeLimit] = useState(false);
    const [value, setValue] = useState(props.value || '');
    const [tempValue, setTempValue] = useState(props.value || '');
    const valueRef = useRef()

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    useEffect(() => {
        props.valueCallback(tempValue);
    }, [tempValue])

    const handleInput = (e) => {
        setTempValue(e.target.innerText);
    };

    const handleKeyPress = (e) => {
        if (typeLimit) {
            e.preventDefault();
        } else {
            switch (e.key) {
                case 'Enter':
                    e.preventDefault();
                    break;
                case ' ':
                    e.preventDefault();
                    break;
                default:
                    return;
            }
        }
    };

    const handlePast = async (e) => {

        if (!!props.typeLimit) {
            e.preventDefault();
            const clipboard = await navigator.clipboard.readText();
            const length = tempValue.length + clipboard.length;
            if (length > props.typeLimit) {
                const clipboardCut = clipboard.slice(0, (props.typeLimit - tempValue.length));
                setTempValue(tempValue + clipboardCut);
                valueRef.current.innerText = tempValue + clipboardCut
                valueRef.current.blur()
            } else {
                setTempValue(tempValue + clipboard);
                valueRef.current.innerText = tempValue + clipboard
                valueRef.current.blur()
            }
        }
    };

    return (
        <div className={'input-string-container ' + (props.loading ? 'loading' : '')}>
            <p
                ref={valueRef}
                className='input-string'
                contentEditable={props.loading ? 'false' : 'true'}
                suppressContentEditableWarning={true}
                onPaste={(e) => handlePast(e)}
                onInput={(e) => handleInput(e)}
                onKeyPress={(e) => handleKeyPress(e)}
            >{value}</p>
            {!!props.typeLimit ?
                <CharactersCounter
                    isActive={true}
                    value={tempValue.length}
                    topLimit={15}
                    callBack={setTypeLimit}
                />
                : null}
        </div>
    )
};

export default InputString