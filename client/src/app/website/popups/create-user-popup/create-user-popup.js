import React, { useContext } from "react"
import { GlobalContext } from "../../../../context/global-context"
import { CreateUserContextComponent } from "../../../../context/create-user-context"
import CreateUser from "./create-user/create-user"
import "./create-user-popup.scss"

const CreateUserPopup = () => {
    /* Global Variables */
    const {
        popup
    } = useContext(GlobalContext)

    /* JSX Output */
    if (popup !== "create-user") {
        return <></>
    } else {
        return (
            <div className="create-user-popup-container">
                <CreateUserContextComponent>
                    <CreateUser />
                </CreateUserContextComponent>
            </div>
        )
    }
}

export default CreateUserPopup
