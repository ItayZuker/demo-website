import React, { useContext } from "react"
import placeholderAvatar from "../../../../../../../../assets/images/placeholder-avatar.jpg"
import { GlobalContext } from "../../../../../../../../context/global-context"
import Loading from "./loading/loading"
import DeleteImage from "./delete-image/delete-image"
import "./image-list.scss"

const ImageList = (props) => {
    /* Global Variables */
    const {
        user
    } = useContext(GlobalContext)

    /* JSX Output */
    return (
        <div
            id="image-list-container"
            className="image-list-container">
            <ul>
                {user.images.length > 0
                    ? user.images.map((item, index) => {
                        return <li
                            key={index} >
                            <Loading loading={props.loadingIndex === index}/>
                            <DeleteImage
                                imageIndex={index}
                                imageKey={user.images[index].key}
                                setLoadingIndex={props.setLoadingIndex}/>
                            <img src={`/profile-images/get-image/${user.images[index].key}`} alt="Image"/>
                        </li>
                    })
                    : <li><img src={placeholderAvatar} alt="Placeholder" /></li>}
            </ul>
        </div>
    )
}

export default ImageList
