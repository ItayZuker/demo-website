import React, { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../../../../../../../context/global-context"
import SuccessIndicator from "../../../../../../../../components/success-indicator/success-indicator"
import InputDropdown from "../../../../../../../../components/input-dropdown/input-dropdown"
import Button from "../../../../../../../../components/button/button"
import "./edit-gender.scss"

const EditGender = () => {
    /* Global Variables */
    const {
        globals,
        user,
        setUser
    } = useContext(GlobalContext)

    /* Locale Variables */
    const [indicateSuccess, setIndicateSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [gender, setGender] = useState(user.gender || "")
    const [gendersArray] = useState(() => {
        const gender = globals.find(item => item.type === "gender")
        return gender.data.options
    })
    const [edit, setEdit] = useState(false)
    const [save, setSave] = useState(false)

    /* Triggers */
    useEffect(() => {
        if (!!gender && gender !== user.gender) {
            setEdit(true)
        } else {
            setEdit(false)
        }
    }, [gender, user.geoData.countryName])

    useEffect(async () => {
        if (save) {
            await saveNewValue()
        }
    }, [save])

    /* Functions */
    const successIndicator = () => {
        setIndicateSuccess(true)
        setTimeout(() => {
            setIndicateSuccess(false)
        }, 2000)
    }

    const handleData = (data) => {
        setUser(prevState => {
            return { ...prevState, gender: data.gender }
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
            const res = await fetch("/profile-details/update-gender", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token,
                    gender
                })
            })
            const data = await res.json()
            handleData(data)
        } catch (err) {
            handleErr(err)
        }
    }

    /* JSX Output */
    return (
        <div className={"edit-gender-container " + (user.gender ? "" : "missing-value")}>
            <div className='title-container'>
                <h2>Gender</h2>
                <SuccessIndicator
                    isActive={indicateSuccess}/>
            </div>
            <div className="input-container">
                <InputDropdown
                    isActive={true}
                    loading={loading}
                    placeholder={"Not selected"}
                    value={gender}
                    array={gendersArray}
                    valueCallback={setGender}/>
            </div>
            <div className="confirmation-container">
                <Button
                    isActive={edit && !!gender}
                    loading={loading}
                    unique={"save"}
                    value={"Save"}
                    callback={setSave}/>
            </div>
        </div>
    )
}

export default EditGender
