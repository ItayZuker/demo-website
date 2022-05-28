import React, { useContext, useState, useEffect } from "react"
import { GlobalContext } from "../../../../../context/global-context"
import placeholderAvatar from "../../../../../assets/images/placeholder-avatar.jpg"
import LoadingDot from "../../../../../components/loading-dot/loading-dot"
import "./profile-thumbnail-button.scss"

const ProfileThumbnailButton = () => {
    /* Global Variables */
    const {
        user
    } = useContext(GlobalContext)

    /* Locale Variables */
    const [loading, setLoading] = useState(false)
    const [profileSrc, setProfileSrc] = useState(null)
    const [profileImageKey, setProfileImageKey] = useState("")

    useEffect(() => {
        if (user.images.length > 0) {
            updateProfileSrc()
        } else {
            setProfileImageKey("")
            setProfileSrc(placeholderAvatar)
        }
    }, [user.images])

    /* Functions */
    const updateProfileSrc = async () => {
        if (user.images[0].key !== profileImageKey) {
            setProfileImageKey(user.images[0].key)
            setLoading(true)
            const res = await fetch(`/profile-images/get-image/${user.images[0].key}`)
            const blob = await res.blob()
            const src = await URL.createObjectURL(blob)
            setProfileSrc(src)
            setLoading(false)
        }
    }

    const goToProfilePage = () => {
        if (window.location.pathname !== "/profile") {
            window.location = "/profile"
        }
    }

    /* JSX Output */
    return (
        <div
            onClick={() => goToProfilePage()}
            className="profile-thumbnail-button-container">
            <div className="image-container">
                <LoadingDot loading={loading} />
                <img src={profileSrc} alt="profile-picture"/>
            </div>
        </div>
    )
}

export default ProfileThumbnailButton
