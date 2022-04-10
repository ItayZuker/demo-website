import React, {useEffect, useState} from "react";
import "./input-handle.scss";

const InputHandle = (props) => {

    /* Locale variables */
    const [on, setOn] = useState(props.innitial || false);
    const [valueOff, setValueOff] = useState(props.valueOff || '');
    const [valueOn, setValueOn] = useState(props.valueOn || '');
    const [value, setValue] = useState(props.valueOff || '');

    /* Triggers */
    useEffect(() => {
        if (props.valueOff) {
            setValueOff(props.valueOff);
        }
        if (props.valueOn) {
            setValueOn(props.valueOn);
        }
    }, [props.valueOff, props.valueOn]);

    useEffect(() => {
       if (on) {
           setValue(valueOn);
           props.callback(true);
       } else {
           setValue(valueOff);
           props.callback(false);
       }
    }, [on]);

    /* Functions */
    const clickHandle = () => {
        on ? setOn(false) : setOn(true);
    };

    /* JSX Output */
    return (
        <div
            className={'input-handle-container ' + (on ? 'on' : '')}>
            <div
                onClick={() => clickHandle()}
                className='handle'>
            </div>
            <p className='value'>{value}</p>
        </div>
    )
};

export default InputHandle;