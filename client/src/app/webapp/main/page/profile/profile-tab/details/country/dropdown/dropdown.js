import React, {useEffect, useRef, useState} from "react";
import "./dropdown.scss";

const Dropdown = (props) => {

    const [array, setArray] = useState(props.array || []);
    const [highlight, setHighlight] = useState('');
    const [index, setIndex] = useState(0);
    const dropdownRef = useRef();

    useEffect(() => {
        setArray(props.array);
    }, [props.array]);

    useEffect(() => {
        // console.log(array)
        resetHighlight();
        setMaxHeight();
    }, [array]);

    useEffect(() => {
        switch (props.keyPressEvent.key) {
            case 'Enter':
                enter();
                break;
            case 'ArrowDown':
                arrowDown();
                break;
            case 'ArrowUp':
                arrowUp();
                break;
            default:
                return;
        }
    }, [props.keyPressEvent]);

    useEffect(() => {
        if (highlight === '') {
        } else {
            if (index >= 0) {
                const item = array[index];
                setHighlight(`dropdown-${item}`);
            } else {
                resetHighlight();
            }
        }
    }, [index]);

    const enter = () => {
        if (highlight !== '') {
            const listItem = document.getElementById(highlight);
            const value = listItem.innerText;
            props.callBack(value);
        }
    };

    const setMaxHeight = () => {
        if (array.length > 1) {
            const item = array[index];
            const listItem = document.getElementById(`dropdown-${item}`);
            if (!!listItem) {
                const computedHeight = window.getComputedStyle(listItem).height;
                const heightString = computedHeight.split('px')[0] ;
                const heightNumber = Number(heightString);
                const maxHeight = heightNumber * props.visible;
                dropdownRef.current.style.maxHeight = `${maxHeight}px`
            }
        } else if (!props.active) {
            dropdownRef.current.style.maxHeight = `0px`;
        }
    };

    const resetHighlight = () => {
        setIndex(0);
        setHighlight('');
    };

    const arrowDown = () => {
        if (!highlight) {
            const item = array[index];
            setHighlight(`dropdown-${item}`);
        } else if (index < array.length - 1) {
            setIndex(prevState => prevState + 1);
        }
    };

    const arrowUp = () => {
        if (highlight !== '') {
            setIndex(prevState => prevState - 1);
        }
    };

    const handleClick = (e) => {
        props.callBack(e.target.innerText);
    };

    return (
        <div
            ref={dropdownRef}
            className={'dropdown-container ' + (props.active ? 'active' : '')}>
            <ul>
                {array.map((item, index) => {
                    return <li
                        className={highlight === `dropdown-${item}` ? 'highlight' : ''}
                        key={index}
                        id={`dropdown-${item}`}>
                        <p
                            onClick={(e) => handleClick(e)}>
                            {item}</p></li>
                })}
            </ul>
        </div>
    )
};

export default Dropdown;