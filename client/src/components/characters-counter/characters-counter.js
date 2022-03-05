import React, {useEffect, useState} from "react";
import "./characters-counter.scss";

const CharactersCounter = (props) => {

    useEffect(() => {
        if (props.value >= props.topLimit) {
            props.callBack(true);
        } else {
            props.callBack(false);
        }
    }, [props.value]);

    return (
        <div className={'character-counter-container ' + (props.active ? 'active' : '')}>
            <p className='current-count'>{props.value}</p>
            <p className='separator'>/</p>
            <p className='limit-count'>{props.topLimit}</p>
        </div>
    )
};

export default CharactersCounter;