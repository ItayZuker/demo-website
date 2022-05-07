import React from "react"
import defaultProfilePicture from "../../../../../assets/images/default-profile-picture.jpg"
import "./profile-thumbnail-button.scss"

const ProfileThumbnailButton = () => {
    /* Functions */
    const goToProfilePage = () => {
        window.location = "/profile"
    }

    /* JSX Output */
    return (
        <div
            onClick={() => goToProfilePage()}
            className="profile-thumbnail-button-container">
            <div className="image-container">
                <img src={defaultProfilePicture} alt="profile-picture"/>
            </div>
        </div>
    )
}

export default ProfileThumbnailButton
