import React, {useContext, useEffect, useRef, useState} from "react";
import {ProfileContext} from "../../../../../../../../context/profile-context";
import Dropdown from "./dropdown/dropdown";
import "./country.scss"

const Country = () => {

    /* Import Global Variables */
    const {
        details,
        setDetails,
        countries
    } = useContext(ProfileContext);

    /* Component Variables */
    const [value, setValue] = useState(details.geoData.countryName || '');
    const [active, setActive] = useState(false);
    const [keyPressEvent, setKeyPressEvent] = useState({});
    const [allCountriesArray, setAllCountriesArray] = useState([]);
    const [dropdownArray, setDropdownArray] = useState([]);
    const valueRef = useRef();

    /* Triggers */
    useEffect(() => {
        resetDropdownArray();
    }, []);

    useEffect(() => {
        setValue(details.geoData.countryName);
    }, [details.geoData.countryName]);

    useEffect(() => {
        updateValue(value);
        updateArray(value);
    }, [value]);

    /* Component Functions */
    const getNewArray = (value) => {
        return new Promise(resolve => {
            if (!value) {
                resolve(allCountriesArray);
            } else {
                const newArray = allCountriesArray.filter(item => {
                    const itemLowerCase = item.toLowerCase();
                    const valueLowerCase = value.toLowerCase();
                    const splitItem = itemLowerCase.split('');
                    const splitValue = valueLowerCase.split('');
                    for (let i = 0; i < splitValue.length; i++) {
                        if (splitItem[i] === splitValue[i]) {
                            if (i === splitValue.length -1) {
                                return item;
                            }
                        } else {
                            return;
                        }
                    }
                });
                resolve(newArray);
            }
        });
    };

    const updateArray = async (value) => {
        const newArray = await getNewArray(value);
        setDropdownArray(newArray);
    };

    const getAllCountriesForDropdown = () => {
        return new Promise(resolve => {
            let allCountries = []
            for (let country of countries) {
                allCountries.push(country.countryName);
            }
            resolve(allCountries);
        })
    }

    const resetDropdownArray = async () => {
        const array = await getAllCountriesForDropdown();
        setAllCountriesArray(array);
        setDropdownArray(array);
    };

    const updateValue = async (value) => {
        const newValue = await verifyValue(value);
        if (!!newValue) {
            setDetails(prevState => {
                return {...prevState, geoData: {
                        countryCode: newValue.countryCode,
                        countryName: newValue.countryName
                    }};
            });
            valueRef.current.blur();
            valueRef.current.innerText = newValue.countryName;
        }
    };

    const verifyValue = (value) => {
        return new Promise(resolve => {
            const isCountry = countries.find(country => {
                const lowerCaseOne = country.countryName.toLowerCase();
                const lowerCaseTwo = value.toLowerCase();
                return lowerCaseOne === lowerCaseTwo;
            });
            if (isCountry) {
                resolve({
                    countryName: isCountry.countryName,
                    countryCode: isCountry.countryCode
                });
            } else {
                resolve(false);
            }
            resolve(false);
        });
    };

    const handleClick = (e) => {
        setActive(true);
    };

    const handleBlur = (e) => {
        setTimeout(async () => {
            const value = valueRef.current.innerText;
            const newValue = await verifyValue(value);
            if (!newValue) {
                setValue(details.geoData.countryName);
            }
            setActive(false);
        }, 100);
    };

    const handleInput = (e) => {
        setValue(e.target.innerText);
    };

    const handleKeyDown = (e) => {
        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                break;
        }
        setKeyPressEvent(e);
    };

    const handlePaste = (e) => {
        e.preventDefault();
    };

    const dropdownCallBack = (value) => {
        setTimeout(async () => {
            setActive(false);
            setValue(value);
        }, 200);
    };

    /* JSX Output */
    return (
        <div className={'country-container ' + (active ? 'active' : '')}>
            <div className='inner-container'>
                <p className='title'>Country:</p>
                <div className='input-container'>
                    <p
                        className='value'
                        tabIndex={-1}
                        contentEditable={active ? 'true' : 'false'}
                        suppressContentEditableWarning={true}
                        ref={valueRef}
                        onBlur={(e) => handleBlur(e)}
                        onClick={(e) => handleClick(e)}
                        onInput={(e) => handleInput(e)}
                        onKeyDown={(e) => handleKeyDown(e)}
                        onPaste={(e) => handlePaste(e)}
                    >{details.geoData.countryName}</p>
                    <Dropdown
                        active={active}
                        array={dropdownArray}
                        value={value}
                        keyPressEvent={keyPressEvent}
                        callBack={dropdownCallBack}
                        visible={4}/>
                </div>
            </div>
        </div>
    )
};

export default Country;