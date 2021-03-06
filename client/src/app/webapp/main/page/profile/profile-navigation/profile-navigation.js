import React, { useEffect, useRef } from "react"
import ProfilePicture from "./profile-picture/profile-picture"
import CreateInvitationButton from "./create-invitation-button/create-invitation-button"
import ProfileNavigationButton from "./profile-navigation-button/profile-navigation-button"
import "./profile-navigation.scss"

const ProfileNavigation = () => {
    /* Local Variables */
    const profileNavigationContainerRef = useRef()

    /* Triggers */
    useEffect(() => {
        updateNavigationPosition()
        document.addEventListener("scroll", () => updateNavigationPosition())
    }, [])

    /* Functions */
    const updateNavigationPosition = () => {
        const navigationContainer = profileNavigationContainerRef.current
        const navigationTop = navigationContainer.getBoundingClientRect().top
        const navigationBottom = navigationContainer.getBoundingClientRect().bottom
        const footerTop = document.getElementById("footer-container").getBoundingClientRect().top
        const headerHeight = 60
        const offset = 90
        const topOffset = headerHeight + offset
        if (footerTop <= (navigationBottom + 80)) {
            if (navigationTop <= topOffset) {
                navigationContainer.style.position = "unset"
            } else {
                navigationContainer.style.position = "fixed"
            }
        } else if (navigationTop >= topOffset) {
            navigationContainer.style.position = "fixed"
        }
    }

    /* JSX Output */
    return (
        <div
            ref={profileNavigationContainerRef}
            className="profile-navigation-container">
            <ProfilePicture />
            <CreateInvitationButton />
            <ProfileNavigationButton title="profile"/>
            <ProfileNavigationButton title="details"/>
            <ProfileNavigationButton title="settings"/>
            <ProfileNavigationButton title="help"/>
        </div>
    )
}

export default ProfileNavigation
