import React, {useContext, useEffect, useRef, useState} from "react";
import {ProfileContext} from "../../../../../../../../context/profile-context";
import CharactersCounter from "../../../../../../../../components/characters-counter/characters-counter";
import "./name-section.scss";

const NameSection = () => {

    /* Import Global Variables */
    const {
        details,
        setDetails,
    } = useContext(ProfileContext);

    /* Component Variables */
    const [value, setValue] = useState(details.name || '');
    const [valueLength, setValueLength] = useState(value ? value.length : 0);
    const [active, setActive] = useState(false);
    const [characterLimit, setCharacterLimit] = useState(false);
    const valueRef = useRef();

    /* Triggers */
    useEffect(() => {
        setValue(details.name);
    }, [details.name]);

    useEffect(() => {
        setValueLength(value ? value.length : 0);
    }, [value]);

    /* Component Functions */
    const handleClick = (e) => {
        if (active) {
            e.preventDefault()
        } else {
            setActive(true);
            valueRef.current.focus();
        }
    };

    const handleBlur = () => {
        setActive(false);
        setDetails(prevState => {
            return {...prevState, name: value};
        });
    };

    const handleInput = (e) => {
            setValue(e.target.innerText);
    };

    const handlePaste = (e) => {
        e.preventDefault();
    };

    const handleKeyPress = (e) => {
        if (characterLimit) {
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

    /* JSX Output */
    return (
        <div
            className={'name-section-container ' + (active ? 'active' : '')}>
            <div className='inner-container'>
                <p
                    className='title'>Name:</p>
                <p
                    className='value'
                    tabIndex={-1}
                    contentEditable={active ? 'true' : 'false'}
                    suppressContentEditableWarning={true}
                    ref={valueRef}
                    onBlur={(e) => handleBlur(e)}
                    onClick={(e) => handleClick(e)}
                    onInput={(e) => handleInput(e)}
                    onKeyPress={(e) => handleKeyPress(e)}
                    onPaste={(e) => handlePaste(e)}
                >{details.name}</p>
            </div>
            <CharactersCounter
                active={active}
                value={valueLength}
                topLimit={15}
                callBack={setCharacterLimit}/>
        </div>
    )
};

export default NameSection;