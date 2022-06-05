import React, { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../../../../../../../context/global-context"
import InputString from "../../../../../../../../components/input-string/input-string"
import Button from "../../../../../../../../components/button/button"
import SuccessIndicator from "../../../../../../../../components/success-indicator/success-indicator"
import CharactersCounter from "../../../../../../../../components/characters-counter/characters-counter"
import "./edit-name.scss"

const EditName = () => {
    /* Global Variables */
    const {
        user,
        setUser,
        globals
    } = useContext(GlobalContext)

    /* Locale Variables */
    const [save, setSave] = useState(false)
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [indicateSuccess, setIndicateSuccess] = useState(false)
    const [edit, setEdit] = useState(false)
    const [stopTyping, setStopTyping] = useState(false)
    const [typeLimit] = useState(() => {
        const imageMaxData = globals.find(item => item.type === "details")
        return imageMaxData.data.name.typeLimit || 0
    })

    /* Triggers */
    useEffect(() => {
        if (save) {
            saveNewValue()
        }
    }, [save])

    useEffect(() => {
        if (!!name && name !== user.name) {
            setEdit(true)
        } else {
            setEdit(false)
        }
    }, [name, user.name])

    /* Functions */
    const verifyValue = (value) => {
        return new Promise((resolve, reject) => {
            if (value) {
                resolve(true)
            } else {
                reject(new Error("No value"))
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
            return { ...prevState, name: data.name }
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
            await verifyValue(name)
            const token = window.localStorage.getItem("token")
            const res = await fetch("/profile-details/update-name", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token,
                    name
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
        <div className="edit-name-container">
            <div className="title-container">
                <h2>Name</h2>
                <SuccessIndicator
                    isActive={indicateSuccess}/>
            </div>
            <div className="input-container">
                <InputString
                    valueChanged={edit && !!name}
                    stopTyping={stopTyping}
                    loading={loading}
                    value={user.name}
                    typeLimit={typeLimit}
                    valueCallback={setName}
                    submitCallback={setSave}/>
                <CharactersCounter
                    isActive={true}
                    typeLimit={typeLimit}
                    value={name.length}
                    callBack={setStopTyping}/>
            </div>
            <div className="confirmation-container">
                <Button
                    isActive={edit && !!name}
                    loading={loading}
                    unique={"save"}
                    value={"Save"}
                    callback={setSave}/>
            </div>
        </div>
    )
}

export default EditName
