import React from "react"
import LogoutSection from "./logout-section/logout-section"
import DeleteAccountSection from "./delete-account-section/delete-account-section"
import "./settings.scss"

const Settings = () => {
    /* JSX Output */
    return (
        <div className="settings-container">
            <LogoutSection />
            <DeleteAccountSection />
        </div>
    )
}

export default Settings
