import React, { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../../../../../../../context/global-context"
import SuccessIndicator from "../../../../../../../../components/success-indicator/success-indicator"
import Button from "../../../../../../../../components/button/button"
import InputDropdown from "../../../../../../../../components/input-dropdown/input-dropdown"
import "./edit-country.scss"

const EditCountry = () => {
    /* Global Variables */
    const {
        user,
        setUser,
        countries
    } = useContext(GlobalContext)

    /* Locale Variables */
    const [save, setSave] = useState(false)
    const [indicateSuccess, setIndicateSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [country, setCountry] = useState(user.geoData.countryName || "")
    const [edit, setEdit] = useState(false)
    const [countriesArray, setCountriesArray] = useState([])

    /* Triggers */
    useEffect(() => {
        if (!!country && country !== user.geoData.countryName) {
            setEdit(true)
        } else {
            setEdit(false)
        }
    }, [country, user.geoData.countryName])

    useEffect(() => {
        if (save) {
            saveNewValue()
        }
    }, [save])

    useEffect(() => {
        updateCountriesArray()
    }, [countries])

    /* Functions */
    const getGeoData = (country) => {
        return new Promise((resolve, reject) => {
            const geoData = countries.find(item => item.countryName === country)
            if (geoData) {
                resolve(geoData)
            } else {
                reject(new Error("No such country in database"))
            }
        })
    }

    const successIndicator = () => {
        setIndicateSuccess(true)
        setTimeout(() => {
            setIndicateSuccess(false)
        }, 2000)
    }

    const handleData = (data) => {
        setUser(prevState => {
            return { ...prevState, geoData: data.geoData }
        })
        setLoading(false)
        setSave(false)
        successIndicator()
    }

    const handleErr = () => {
        setLoading(false)
        setSave(false)
    }

    const saveNewValue = async () => {
        setLoading(true)
        try {
            const token = window.localStorage.getItem("token")
            const geoData = await getGeoData(country)
            const res = await fetch("/profile-details/update-country", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token,
                    geoData
                })
            })
            const data = await res.json()
            handleData(data)
        } catch (err) {
            handleErr(err)
        }
    }

    const updateCountriesArray = async () => {
        const array = await countries.map(country => country.countryName)
        setCountriesArray(array)
    }

    /* JSX Output */
    return (
        <div className={"edit-country-container " + (user.geoData.countryName ? "" : "missing-value")}>
            <div className="title-container">
                <h2>Country</h2>
                <SuccessIndicator
                    isActive={indicateSuccess}/>
            </div>
            <div className="input-container">
                <InputDropdown
                    isActive={true}
                    loading={loading}
                    value={country}
                    array={countriesArray}
                    valueCallback={setCountry}/>
            </div>
            <div className="confirmation-container">
                <Button
                    isActive={edit && !!country}
                    loading={loading}
                    unique={"save"}
                    value={"Save"}
                    callback={setSave}/>
            </div>
        </div>
    )
}

export default EditCountry
