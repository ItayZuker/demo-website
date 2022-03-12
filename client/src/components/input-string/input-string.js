import React, {useEffect, useState} from "react";
import CharactersCounter from "../characters-counter/characters-counter";
import "./input-string.scss";

const InputString = (props) => {

    const [typeLimit, setTypeLimit] = useState(false);
    const [value, setValue] = useState(props.value || '');
    const [tempValue, setTempValue] = useState(props.value || '');

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

    return (
        <div className={'input-string-container ' + (props.loading ? 'loading' : '')}>
            <p
                className='input-string'
                contentEditable={props.loading ? 'false' : 'true'}
                suppressContentEditableWarning={true}
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