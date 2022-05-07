import React, { useContext } from "react"
import { ProfileContext } from "../../../../../../../context/profile-context"
import "./profile-navigation-button.scss"

const ProfileNavigationButton = (props) => {
    /* Global Variables */
    const {
        tab,
        setTab
    } = useContext(ProfileContext)

    /* Functions */
    const goToTab = () => {
        setTab(props.title)
    }

    /* JSX Output */
    return (
        <div
            onClick={() => goToTab()}
            className={"profile-navigation-button-container " + (props.title === tab ? "active" : "")}>
            <p>{props.title}</p>
        </div>
    )
}

export default ProfileNavigationButton
