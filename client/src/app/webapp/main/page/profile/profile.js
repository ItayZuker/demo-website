import React, { useContext, useEffect } from "react"
import { ProfileContext } from "../../../../../context/profile-context"
import ProfileNavigation from "./profile-navigation/profile-navigation"
import ProfileTab from "./profile-tab/profile-tab"
import "./profile.scss"

const Profile = () => {
    /* Global Variables */
    const {
        setTab
    } = useContext(ProfileContext)

    /* Triggers */
    useEffect(() => {
        setTab("profile")
    }, [])

    return (
        <div className="profile-container">
            <ProfileNavigation />
            <ProfileTab />
        </div>
    )
}

export default Profile
