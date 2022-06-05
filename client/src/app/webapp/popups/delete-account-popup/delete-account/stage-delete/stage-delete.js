import React, { useState, useContext, useEffect } from "react"
import { GlobalContext } from "../../../../../../context/global-context"
import Button from "../../../../../../components/button/button"
import Loading from "../../../../../../components/loading/loading"
import "./stage-delete.scss"

const StageDelete = () => {
    /* Global Variables */
    const {
        setPopup,
        setLogin,
        setGlobalMessage,
        logout
    } = useContext(GlobalContext)

    /* Locale Variables */
    const [loading, setLoading] = useState(false)
    const [cancel, setCancel] = useState(false)
    const [deleteMyAccount, setDeleteMyAccount] = useState(false)
    const [validationRef] = useState("delete permanently")
    const [validation, setValidation] = useState(false)

    useEffect(() => {
        if (validation) {
            deleteAccountPermanently()
        }
    }, [deleteMyAccount])

    useEffect(() => {
        if (cancel) {
            setPopup("")
        }
    }, [cancel])

    /* Functions */
    const handleData = (data) => {
        if (data.expiredAt) {
            /* TODO: Token expires, user was not deleted */
            logout()
        } else if (data.deleted) {
            localStorage.removeItem("token")
            setLogin(false)
            setGlobalMessage("account-deleted")
            window.location = "/"
        } else {
            /* TODO: Something went wrong user was not deleted */
        }
    }

    const deleteAccountPermanently = async () => {
        setLoading(true)
        const token = window.localStorage.getItem("token")
        try {
            const res = await fetch("/profile-settings/delete-account", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token
                })
            })
            const data = await res.json()
            handleData(data)
        } catch (err) {
            setLoading(false)
        }
    }

    const handleInputChange = (e) => {
        e.target.value === validationRef ? setValidation(true) : setValidation(false)
    }

    /* JSX Output */
    return (
        <div className="stage-delete-container">
            <Loading loading={loading}/>
            <div className="text-container">
                <p>To delete your account permanently, type this text in the following input field: <span className="validation-text">{validationRef}</span></p>
            </div>
            <div className="input-container">
                <input
                    placeholder={validationRef}
                    onChange={(e) => handleInputChange(e)}/>
            </div>
            <div className="buttons-container">
                <Button
                    isActive={validation}
                    loading={false}
                    value={"Delete my account"}
                    callback={setDeleteMyAccount}
                    unique={"warning"}/>
                <Button
                    isActive={true}
                    loading={false}
                    value={"Cancel"}
                    callback={setCancel}/>
            </div>
        </div>
    )
}

export default StageDelete
