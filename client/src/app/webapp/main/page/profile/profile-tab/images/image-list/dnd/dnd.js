import React, { useEffect, useState, useContext } from "react"
import { FileUploader } from "react-drag-drop-files"
import { GlobalContext } from "../../../../../../../../../context/global-context"
import "./dnd.scss"

const Dnd = (props) => {
    /* Global Variables */
    const {
        setUser,
        globals
    } = useContext(GlobalContext)

    /* Locale Variables */
    const [maxImageSize] = useState(() => {
        const image = globals.find(item => item.type === "images")
        return image.data.maxImageSize / 100000
    })
    const [fileTypes] = useState(() => {
        const image = globals.find(item => item.type === "images")
        return image.data.fileTypes
    })
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [generalErrorMessage] = useState("Something went wrong, please try again")
    const [error, setError] = useState({
        active: false,
        message: ""
    })

    /* Triggers */
    useEffect(() => {
        if (error.active) {
            deActiveError()
        }
    }, [error])

    useEffect(() => {
        if (file) {
            uploadFile(file)
        }
    }, [file])

    /* Functions */
    const deActiveError = () => {
        setTimeout(() => {
            setError({
                active: false,
                message: ""
            })
        }, 3000)
    }

    const cleanImageInput = () => {
        const input = document.getElementsByTagName("input")
        input[0].value = ""
    }

    const handleData = (data) => {
        cleanImageInput()
        if (data.images) {
            setUser(prevState => {
                return {
                    ...prevState,
                    images: data.images
                }
            })
        }
        setLoading(false)
    }

    const handleErr = () => {
        cleanImageInput()
        setLoading(false)
        setError({
            active: true,
            message: generalErrorMessage
        })
    }

    const uploadFile = async (file) => {
        try {
            if (file) {
                setLoading(true)
                const token = window.localStorage.getItem("token")
                const formData = new FormData()
                formData.append("token", token)
                formData.append("image", file)
                const res = await fetch("/profile-images/upload", {
                    method: "post",
                    body: formData
                })
                const data = await res.json()
                handleData(data)
            }
        } catch (err) {
            handleErr()
        }
    }

    const onSizeError = (message) => {
        setError({
            active: true,
            message
        })
    }

    /* JSX Output */
    return (
        <div className={"dnd-container " + (loading ? "loading " : "") + (error ? "error " : "")}>
            <FileUploader
                disabled={props.dragging}
                multiple={false}
                maxSize={maxImageSize}
                handleChange={(image) => setFile(image)}
                name="file"
                types={fileTypes}
                onSizeError={(message) => onSizeError(message)}>
                {error.active
                    ? <div className="error-container">
                        <p>Something went wrong, please try again</p>
                    </div>
                    : <div className="inner-container">
                        <div className="icon-container">
                            <svg width="360" height="360" viewBox="0 0 360 360" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_110_2)">
                                    <path d="M349.75 180C344.37 180 340 184.37 340 189.75V210C340 215.52 335.52 220 330 220H309.75C304.37 220 300 224.37 300 229.75C300 235.13 304.37 239.5 309.75 239.5H339.5C350.55 239.5 359.5 230.55 359.5 219.5V189.75C359.5 184.37 355.13 180 349.75 180Z" fill="black"/>
                                    <path d="M349.75 90C344.37 90 340 94.37 340 99.75V140.25C340 145.63 344.37 150 349.75 150C355.13 150 359.5 145.63 359.5 140.25V99.75C359.5 94.37 355.13 90 349.75 90Z" fill="black"/>
                                    <path d="M129.75 60H130.25C135.63 60 140 55.63 140 50.25V30C140 24.48 144.48 20 150 20H170.25C175.63 20 180 15.63 180 10.25V9.75C180 4.37 175.63 0 170.25 0H140C128.95 0 120 8.95 120 20V50.25C120 55.63 124.37 60 129.75 60Z" fill="black"/>
                                    <path d="M339.5 0H309.75C304.37 0 300 4.37 300 9.75V10.25C300 15.63 304.37 20 309.75 20H330C335.52 20 340 24.48 340 30V50.25C340 55.63 344.37 60 349.75 60C355.13 60 359.5 55.63 359.5 50.25V20C359.5 8.95 350.55 0 339.5 0Z" fill="black"/>
                                    <path d="M260.25 0H219.75C214.365 0 210 4.36522 210 9.75V10.25C210 15.6348 214.365 20 219.75 20H260.25C265.635 20 270 15.6348 270 10.25V9.75C270 4.36522 265.635 0 260.25 0Z" fill="black"/>
                                    <path d="M279.5 60H249.75C244.37 60 240 64.37 240 69.75V70.25C240 75.63 244.37 80 249.75 80H265.36L224.66 120.7C223.01 120.26 221.29 120 219.5 120H140V99.75C140 94.37 135.63 90 130.25 90H129.75C124.37 90 120 94.37 120 99.75V120H20C8.95 120 0 128.95 0 140V339.5C0 350.55 8.95 359.5 20 359.5H219.5C230.55 359.5 239.5 350.55 239.5 339.5V239.5H260.25C265.63 239.5 270 235.13 270 229.75C270 224.37 265.63 220 260.25 220H239.5V140C239.5 138.21 239.24 136.49 238.8 134.84L280 93.64V110.25C280 115.63 284.37 120 289.75 120C295.13 120 299.5 115.63 299.5 110.25V80C299.5 68.95 290.55 60 279.5 60ZM220 220V330C220 335.52 215.52 340 210 340H30C24.48 340 20 335.52 20 330V150C20 144.48 24.48 140 30 140H205.36L145.15 200.21C141.24 204.12 141.24 210.45 145.15 214.35C149.05 218.26 155.39 218.26 159.29 214.35L220 153.64V220Z" fill="black"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_110_2">
                                        <rect width="359.5" height="359.5" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <p>Upload Image</p>
                    </div>
                }
            </FileUploader>
        </div>
    )
}

export default Dnd
