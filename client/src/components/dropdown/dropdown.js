import React, {useEffect, useRef, useState} from "react";
import "./dropdown.scss";

const Dropdown = (props) => {

    /* Locale Variables */
    const [highlight, setHighlight] = useState('');
    const [index, setIndex] = useState(0);
    const [array, setArray] = useState(props.array || []);
    const dropdownContainerRef = useRef();
    const dropdownUlRef = useRef();

    /* Triggers */
    useEffect(() => {
        updateActive();
        setArray(props.array);
    }, [props.array]);

    useEffect(() => {
        updateActive();
    }, [props.isActive]);

    useEffect(() => {
        handleKeyDownEvent(props.keyDownEvent)
    }, [props.keyDownEvent]);

    useEffect(() => {
        highlightIndex(index);
        updateScroll(index);
    }, [index])

    /* Functions */
    const updateScroll = async (index) => {
        const ulContainerBottom = dropdownContainerRef.current.getBoundingClientRect().bottom;
        const ulContainerTop = dropdownContainerRef.current.getBoundingClientRect().top;
        const ulContainerHeight = Number(window.getComputedStyle(dropdownContainerRef.current).height.split('px')[0])
        const ulArray = Array.from(dropdownUlRef.current.childNodes);
        const highlight = ulArray.find((item, i) => i === index - 1);
        if (highlight) {
            const highlightBottom = highlight.getBoundingClientRect().bottom;
            const highlightTop = highlight.getBoundingClientRect().top;

            if (highlightBottom > ulContainerBottom) {
                let delta = 0;
                ulArray.forEach((item, i) => {
                    if (i < index) {
                        const height = Number(window.getComputedStyle(item).height.split('px')[0]);
                        delta += height;
                    }
                });
                dropdownContainerRef.current.scrollTo({
                    top: delta - ulContainerHeight,
                    left: 0
                });
            }
            if (highlightTop < ulContainerTop) {
                let delta = 0;
                ulArray.forEach((item, i) => {
                    if (i < index - 1) {
                        const height = Number(window.getComputedStyle(item).height.split('px')[0]);
                        delta += height;
                    }
                });
                dropdownContainerRef.current.scrollTo({
                    top: delta,
                    left: 0
                });
            }
        }
    };

    const highlightIndex = (index) => {
        const country = props.array[index - 1];
        setHighlight(country);
    };

    const handleKeyDownEvent = (e) => {
        switch (e.key) {
            case 'Enter':
                pressEnter();
                break;
            case 'Backspace':
                pressBackspace();
                break;
            case 'ArrowDown':
                pressArrowDown();
                break;
            case 'ArrowUp':
                pressArrowUp();
                break;
            default:
                return;
        }
    };

    const pressEnter = () => {
        if (index > 0) {
            const country = props.array[index - 1];
            props.valueCallback(country);
            setIndex(0);
        }
    };

    const pressArrowDown = () => {
        if (index <= props.array.length - 1) {
            // updateScroll(index + 1, 'down');
            setIndex(index + 1);
        }
    };

    const pressArrowUp = () => {
        if (index > 0) {
            // updateScroll(index - 1, 'up');
            setIndex(index - 1);
        }
    };

    const pressBackspace = () => {
        setHighlight('');
        setIndex(0);
    };

    const getOpenHeight = () => {
        return new Promise(resolve => {
            let height = 0;
            const array = Array.from(dropdownUlRef.current.childNodes);
            array.forEach((item, index) => {
                if (index < props.inView) {
                    const thisHeight = Number(window.getComputedStyle(item).height.split('px')[0]);
                    height += thisHeight;
                }
            });
            resolve(height);
        });
    };

    const updateActive = async () => {
        if (props.isActive) {
            const openHeight = await getOpenHeight();
            dropdownContainerRef.current.style.maxHeight = `${openHeight}px`;
        } else {
            dropdownContainerRef.current.style.maxHeight = '0px';
        }
    }

    const handleClick = (country) => {
        setIndex(0);
        props.valueCallback(country);
    };

    /* JSX Output */
    return (
        <div
            ref={dropdownContainerRef}
            className={'dropdown-container '}>
            <ul ref={dropdownUlRef}>
                {array.map((country, index) => {
                    return <li
                        key={index}
                        className={highlight === country ? 'highlight' : ''}
                        onClick={(e) => handleClick(country)}>
                        <p>{country}</p></li>
                })}
            </ul>
        </div>
    )
};

export default Dropdown;