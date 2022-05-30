import React, { useContext, useState } from "react"
import { GlobalContext } from "../../../../../../../../context/global-context"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
// import DropdownDots from "../../../../../../../../components/dropdown-dots/dropdown-dots"
// import DeleteImageConfirmation from "./delete-image-confirmation/delete-image-confirmation"
import Dnd from "./dnd/dnd"
import ImageItem from "./image-item/image-item"
import "./image-list.scss"

const ImageList = (props) => {
    /* Global Variables */
    const {
        user,
        setUser
    } = useContext(GlobalContext)

    /* Locale Variables */
    const [dragging, setDragging] = useState(false)

    /* Functions */
    const onDragStart = () => {
        setDragging(true)
    }

    const onDragEnd = (e) => {
        setDragging(false)
        const images = user.images
        const sourceIndex = e.source.index
        const destinationIndex = e.destination.index
        const element = images.splice(sourceIndex, 1)[0]
        images.splice(destinationIndex, 0, element)
        updateDB(images)
    }

    const handleData = (data) => {
        setUser(prevState => {
            return {
                ...prevState,
                images: data.images
            }
        })
    }

    const handleErr = () => {

    }

    const updateDB = async (images) => {
        try {
            const token = window.localStorage.getItem("token")
            const res = await fetch("/profile-images/rearrange", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token,
                    images
                })
            })
            const data = await res.json()
            handleData(data)
        } catch (err) {
            handleErr()
        }
    }
    /* JSX Output */
    return (
        <div
            className="image-list-container">
            {user.images.length < 3 ? <Dnd dragging={dragging}/> : <></>}
            <DragDropContext
                onDragStart={() => onDragStart()}
                onDragEnd={(e) => onDragEnd(e)}>
                <Droppable droppableId="droppable-1" type="PERSON">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}>
                            {user.images.map((image, index) => (
                                <Draggable
                                    key={"key-" + image.smallKey}
                                    draggableId={"droppable-" + image.smallKey}
                                    index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            className="draggable-item">
                                            <ImageItem
                                                dragging={dragging}
                                                index={index}
                                                provided={provided}/>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default ImageList
