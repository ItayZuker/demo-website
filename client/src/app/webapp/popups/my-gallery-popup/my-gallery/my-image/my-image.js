import React, { useEffect, useState } from "react"
import Loading from "../../../../../../components/loading/loading"
import "./my-image.scss"

const MyImage = (props) => {
    /* Locale Variables */
    const [imageSrc, setImageSrc] = useState(null)
    const [loading, setLoading] = useState(false)

    /* Triggers */
    useEffect(() => {
        updateProfileSrc()
    }, [])

    /* Functions */
    const updateProfileSrc = async () => {
        setLoading(true)
        const res = await fetch(`/profile-images/get-image/${props.image.largeKey}`)
        const blob = await res.blob()
        const src = await URL.createObjectURL(blob)
        setImageSrc(src)
        setLoading(false)
    }

    /* JSX Output */
    return (
        <div className="my-image-container">
            <div className="image-container">
                <Loading loading={loading}/>
                <img src={imageSrc} />
            </div>
            <div className={"comment-container " + (loading ? "loading" : "")}>
                <p className="comment">{props.image.comment}</p>
            </div>
        </div>
    )
}

export default MyImage
