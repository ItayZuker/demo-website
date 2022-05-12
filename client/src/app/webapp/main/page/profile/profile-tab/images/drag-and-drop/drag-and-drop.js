import React, { useState } from "react"
import { FileUploader } from "react-drag-drop-files"
import "./drag-and-drop.scss"

const DragAndDrop = (props) => {
    // eslint-disable-next-line
    const [fileTypes] = useState(["JPG", "PNG", "GIF"])

    return (
        <div className="drag-and-drop-container">
            <FileUploader handleChange={image => props.setImage(image)} name="image" types={fileTypes} />
        </div>
    )
}

export default DragAndDrop
