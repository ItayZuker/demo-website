import React, { useContext } from "react"
import placeholderAvatar from "../../../../../assets/images/placeholder-avatar.jpg"
import { GlobalContext } from "../../../../../context/global-context"
import "./profile-thumbnail-button.scss"

const ProfileThumbnailButton = () => {
    /* Global Variables */
    const {
        user
    } = useContext(GlobalContext)

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
                {user.images.length > 0
                    ? <img src={`/profile-images/get-image/${user.images[0].key}`} alt="profile-picture"/>
                    : <img src={placeholderAvatar} alt="profile-picture-placeholder"/>}
            </div>
        </div>
    )
}

export default ProfileThumbnailButton
