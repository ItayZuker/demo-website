import React, {useEffect, useState} from "react";
import './input-check-box.scss';

const InputCheckBox = (props) => {

    const [check, setCheck] = useState(props.innitial || false);

    useEffect(() => {
        setCheck(props.initial);
    }, [props.initial]);

    const clickCheckBox = () => {
        if(check) {
            setCheck(false);
            props.callback(false);

        } else {
            setCheck(true);
            props.callback(true);
        }
    };

    return (
        <div
            className={'input-check-box-container ' + (check ? 'check' : '')}
            onClick={() => clickCheckBox()}>
            <div className='check-box'>
            </div>
            <p className='check-box-text'>{props.text}</p>
        </div>
    )
}

export default InputCheckBox;