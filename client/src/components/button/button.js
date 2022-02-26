import React, {useState} from "react";
import "./button.scss";

const Button = (props) => {

    const [value] = useState(props.value || 'Button');

    return (
        <div
            className={'button-container ' + (props.isActive ? 'active ' : '') + (props.loading ? 'loading ' : '') + (props.unique ? props.unique : '')}
            onClick={() => props.callback(true)}>
            <p>{value}</p>
        </div>
    )
};

export default Button;