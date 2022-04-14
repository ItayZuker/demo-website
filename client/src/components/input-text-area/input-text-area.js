import React, {useState, useEffect} from "react";
import CharactersCounter from "../characters-counter/characters-counter";
import "./input-text-area.scss";

const InputTextArea = (props) => {

    const [value, setValue] = useState(props.value || '');
    const [typeLimit, setTypeLimit] = useState(false);

    useEffect(() => {
        props.valueCallback(value);
    }, [value]);

    const handleKeyPress = (e) => {
        if (typeLimit) {
            e.preventDefault();
        }
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handlePast = async (e) => {
        if (!!props.typeLimit) {
            e.preventDefault();
            const currentText = e.target.value;
            const clipboard = await navigator.clipboard.readText();
            const length = currentText.length + clipboard.length;
            if (length > props.typeLimit) {
                const clipboardCut = clipboard.slice(0, (props.typeLimit - currentText.length));
                setValue(currentText + clipboardCut);
            } else {
                setValue(currentText + clipboard);
            }
        }
    };

    return (
        <div className={'input-text-area-container ' + (props.loading ? 'loading' : '')}>
            <textarea
                value={value}
                onPaste={(e) => handlePast(e)}
                onKeyPress={(e) => handleKeyPress(e)}
                onChange={(e) => handleChange(e)} />
            <CharactersCounter
                isActive={!!props.typeLimit}
                value={value.length}
                topLimit={props.typeLimit}
                callBack={setTypeLimit}/>
        </div>
    )
};

export default InputTextArea