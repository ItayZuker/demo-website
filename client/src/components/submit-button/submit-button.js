import React, {useState} from "react";
import './submit-button.scss';

const SubmitButton = (props) => {

    /* Locale State Variables */
    const [value] = useState(props.value || 'Submit');

    /* JSX Output */
    return (
        <div
            className={'submit-button ' + (props.isActive ? 'active ' : '') + (props.loading ? 'loading' : '')}
            onClick={() => props.callback()}>
            <p>{value}</p>
        </div>
    )
}

export default SubmitButton