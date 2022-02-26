import React, {useContext} from "react";
import {ProfileContext} from "../../../../../../../context/profile-context";
import "./profile-navigation-button.scss";

const ProfileNavigationButton = (props) => {

    const {
        tab,
        setTab,
    } = useContext(ProfileContext);

    const goToTab = () => {
        setTab(props.title);
    }

    return (
        <div
            onClick={() => goToTab()}
            className={'profile-navigation-button-container ' + (props.title === tab ? 'active' : '')}>
            <p>{props.title}</p>
        </div>
    )
}

export default ProfileNavigationButton;