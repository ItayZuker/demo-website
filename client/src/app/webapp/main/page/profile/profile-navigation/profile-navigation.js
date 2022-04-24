import React, {useContext, useEffect, useRef} from "react";
import {ProfileContext} from "../../../../../../context/profile-context";
import ProfilePicture from "./profile-picture/profile-picture";
import CreateInvitationButton from "./create-invitation-button/create-invitation-button";
import ProfileNavigationButton from "./profile-navigation-button/profile-navigation-button";
import "./profile-navigation.scss";

const ProfileNavigation = () => {

    /* Import Global Variables */
    const {
        setTab,
    } = useContext(ProfileContext);

    /* Local Variables */
    const profileNavigationContainerRef = useRef();

    /* Trigger Functions */
    useEffect(() => {
        const footer = document.getElementById('footer-container');
        const footerHeight = footer.getBoundingClientRect().height;
        const navigationContainer = profileNavigationContainerRef.current;
        const originalDistanceFromTop = navigationContainer.getBoundingClientRect().bottom;
        document.addEventListener('scroll', () => limitPosition(navigationContainer, footerHeight - 150, originalDistanceFromTop))
    }, []);

    /* Component Functions */
    const limitPosition = (element, limitPosition, originalDistanceFromTop) => {
        const documentHeight = document.body.scrollHeight;
        const windowHeight = window.innerHeight;
        const movingFromTop = window.pageYOffset;
        const bottom = documentHeight - windowHeight
        const distanceFromBottom = bottom - movingFromTop;
        const distanceFromLimit = distanceFromBottom - limitPosition;
        const originalDistanceFromBottom = windowHeight - originalDistanceFromTop
        if (distanceFromLimit < 0) {
            const fixPosition = Math.abs(distanceFromLimit) + originalDistanceFromBottom;
            element.style.bottom = `${fixPosition}px`
        } else {
            element.style.bottom = `${originalDistanceFromBottom}px`;
        }
    };

    /* JSX Output */
    return (
        <div
            ref={profileNavigationContainerRef}
            className='profile-navigation-container'>
            <ProfilePicture />
            <CreateInvitationButton />
            <ProfileNavigationButton title='profile'/>
            <ProfileNavigationButton title='details'/>
            <ProfileNavigationButton title='settings'/>
            <ProfileNavigationButton title='help'/>
        </div>
    )
};

export default ProfileNavigation;