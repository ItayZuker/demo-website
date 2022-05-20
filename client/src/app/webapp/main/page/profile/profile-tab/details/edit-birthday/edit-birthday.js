import React, { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../../../../../../../context/global-context"
import "./edit-birthday.scss"

const EditBirthday = () => {
    /* Global Variables */
    const {
        user,
        setTab
    } = useContext(GlobalContext)

    /* Locale Variables */
    const [openEdit, setOpenEdit] = useState(false)
    const [closeEdit, setCloseEdit] = useState(false)

    /* Triggers */
    useEffect(() => {
        if (closeEdit) {
            setOpenEdit(false)
        }
    }, [closeEdit])

    useEffect(() => {
        if (openEdit) {
            setCloseEdit(false)
        }
    }, [openEdit])

    /* Functions */
    const goToSupport = () => {
        setTab("help")
    }

    /* JSX Output */
    return (
        <div className="edit-birthday-container">
            <div className="title-container">
                <h2>Birthday</h2>
            </div>
            <div className="birthday-container">
                <p>{user.birthday.month.string + "." + user.birthday.day.decimal + "." + user.birthday.year.decimal}</p>
            </div>
            <div className="edit-container">
                <p>To edit your birthday, Please contact <span className="support-button" onClick={() => goToSupport()}>support</span></p>
            </div>
        </div>
    )
}

export default EditBirthday
