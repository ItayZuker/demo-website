import React, { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../../../../../../context/global-context"
import { ProfileContext } from "../../../../../../../context/profile-context"
import placeholderAvatar from "../../../../../../../assets/images/placeholder-avatar.jpg"
import Loading from "../../../../../../../components/loading/loading"
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

    /* Locale Variables */
    const [profileSrc, setProfileSrc] = useState(null)
    const [loading, setLoading] = useState(false)
    const [profileImageKey, setProfileImageKey] = useState("")

    /* Triggers */
    useEffect(() => {
        if (user.images.length > 0) {
            updateProfileSrc()
        } else {
            setProfileImageKey("")
            setProfileSrc(placeholderAvatar)
        }
    }, [user.images])

    /* Functions */
    const goToTab = () => {
        setTab("images")
    }

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

    /* JSX Output */
    return (
        <div className={"profile-picture-container " + (tab === "images" ? "active " : "")}>
            <div className="image-container">
                <Loading loading={loading}/>
                <div
                    onClick={() => goToTab()}
                    className="icon-container">
                    <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_208_11)">
                            <path d="M50 10H20C8.95 10 0 18.95 0 30V90C0 101.05 8.95 110 20 110H80C91.05 110 100 101.05 100 90V60C100 54.48 95.52 50 90 50C84.48 50 80 54.48 80 60V80C80 85.52 75.52 90 70 90H30C24.48 90 20 85.52 20 80V40C20 34.48 24.48 30 30 30H50C55.52 30 60 25.52 60 20C60 14.48 55.52 10 50 10Z" fill="black"/>
                            <path d="M38.83 71.1701C39.54 71.8801 40.61 72.1101 41.55 71.7401C53.46 66.9801 64.3 59.8501 73.39 50.7601L107.07 17.0701C110.98 13.1601 110.98 6.83006 107.07 2.93006C103.16 -0.979941 96.83 -0.979941 92.93 2.93006L59.24 36.6201C50.15 45.7101 43.01 56.5501 38.26 68.4601C37.89 69.3901 38.12 70.4601 38.83 71.1801V71.1701Z" fill="black"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_208_11">
                                <rect width="110" height="110" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <img src={profileSrc} alt="profile-picture"/>
            </div>
        </div>
    )
}

export default ProfilePicture
