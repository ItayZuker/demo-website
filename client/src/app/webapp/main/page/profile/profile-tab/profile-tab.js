import React, { useContext } from "react"
import { ProfileContext } from "../../../../../../context/profile-context"
import View from "./view/view"
import Images from "./images/images"
import Details from "./details/details"
import Settings from "./settings/settings"
import Help from "./help/help"
import "./profile-tab.scss"

const ProfileTab = () => {
    /* Global Variables */
    const {
        tab
    } = useContext(ProfileContext)

    /* JSX Output */
    return (
        <div className="profile-tab-container">
            {tab === "profile" ? <View /> : <></>}
            {tab === "images" ? <Images /> : <></>}
            {tab === "details" ? <Details /> : <></>}
            {tab === "settings" ? <Settings /> : <></>}
            {tab === "help" ? <Help /> : <></>}
        </div>
    )
}

export default ProfileTab
