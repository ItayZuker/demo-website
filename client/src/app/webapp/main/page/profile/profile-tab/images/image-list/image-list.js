import React, { useContext, useState } from "react"
import placeholderAvatar from "../../../../../../../../assets/images/placeholder-avatar.jpg"
import { GlobalContext } from "../../../../../../../../context/global-context"
import Loading from "./loading/loading"
import DropdownDots from "../../../../../../../../components/dropdown-dots/dropdown-dots"
import DeleteImageConfirmation from "./delete-image-confirmation/delete-image-confirmation"
// import DeleteImage from "./delete-image/delete-image"
import "./image-list.scss"

const ImageList = (props) => {
    /* Global Variables */
    const {
        user,
        setUser
    } = useContext(GlobalContext)

    /* Locale Variables */
    const [deleteConfirmation, setDeleteConfirmation] = useState(false)
    const [dropdownList] = useState([
        { title: "Profile picture", active: false },
        { title: "Delete", active: false }
    ])

    /* Functions */
    const clickMenuItem = (object) => {
        switch (object.title) {
        case "Profile picture":
            selectProfileImage(object)
            break
        case "Delete":
            clickDelete(object.imageIndex)
            break
        }
    }

    const selectProfileImage = (object) => {
        if (object.imageIndex !== 0) {
            const newImagesArray = user.images
            const newProfileImage = newImagesArray[object.imageIndex]
            newImagesArray.splice(object.imageIndex, 1)
            newImagesArray.splice(0, 0, newProfileImage)
            setUser(prevState => {
                return {
                    ...prevState,
                    images: newImagesArray
                }
            })
        }
    }

    const clickDelete = (imageIndex) => {
        setDeleteConfirmation(imageIndex)
    }

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
                            <DropdownDots
                                dropdownList={dropdownList}
                                clickMenuItem={clickMenuItem}
                                imageIndex={index}/>
                            {deleteConfirmation === index
                                ? <DeleteImageConfirmation
                                    imageIndex={index}
                                    setLoadingIndex={props.setLoadingIndex}
                                    setDeleteConfirmation={setDeleteConfirmation}/>
                                : <></>
                            }
                            <img src={`/profile-images/get-image/${user.images[index].key}`} alt="Image"/>
                        </li>
                    })
                    : <li><img src={placeholderAvatar} alt="Placeholder" /></li>}
            </ul>
        </div>
    )
}

export default ImageList
