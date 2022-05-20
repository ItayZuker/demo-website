import React, { useContext } from "react"
import { GlobalContext } from "../../../../../../../context/global-context"
import { ProfileContext } from "../../../../../../../context/profile-context"
import placeholderAvatar from "../../../../../../../assets/images/placeholder-avatar.jpg"
import "./profile-picture.scss"

const ProfilePicture = () => {
    /* Global Variables */
    const {
        user
    } = useContext(GlobalContext)

    const {
        tab,
        setTab
    } = useContext(ProfileContext)

    /* Functions */
    const goToTab = () => {
        setTab("images")
    }

    /* JSX Output */
    return (
        <div className={"profile-picture-container " + (tab === "picture" ? "active" : "")}>
            <div className="image-container">
                {user.images.length > 0
                    ? <img src={`/profile-images/get-image/${user.images[0].key}`} alt="profile-picture"/>
                    : <img src={placeholderAvatar} alt="profile-picture-placeholder"/>}
            </div>
            <p onClick={() => goToTab()}>Edit</p>
        </div>
    )
}

export default ProfilePicture
