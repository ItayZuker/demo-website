import React, { useContext } from "react"
import { GlobalContext } from "../../../../../context/global-context"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from "react-responsive-carousel"
import "./my-gallery.scss"
import pic1 from "../../../../../assets/temp/hero-background.jpg"
import pic2 from "../../../../../assets/temp/cat2.jpg"
import pic3 from "../../../../../assets/temp/cat3.jpg"

const MyGallery = () => {
    /* Global Variables */
    const {
        setPopup
    } = useContext(GlobalContext)

    /* JSX Output */
    return (
        <div className="my-gallery-container">
            <div
                onClick={() => setPopup("")}
                className='close-icon-container'>
                <svg width="91" height="91" viewBox="0 0 91 91" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M62.9901 41.8601L87.7801 17.0701C91.6901 13.1601 91.6901 6.83006 87.7801 2.93006C83.8701 -0.979941 77.5401 -0.979941 73.6401 2.93006L48.8501 27.7201C46.9201 29.6501 43.7901 29.6501 41.8601 27.7201L17.0701 2.93006C13.1601 -0.979941 6.83006 -0.979941 2.93006 2.93006C-0.979941 6.84006 -0.979941 13.1701 2.93006 17.0701L27.7201 41.8601C29.6501 43.7901 29.6501 46.9201 27.7201 48.8501L2.93006 73.6401C-0.979941 77.5501 -0.979941 83.8801 2.93006 87.7801C6.84006 91.6901 13.1701 91.6901 17.0701 87.7801L41.8601 62.9901C43.7901 61.0601 46.9201 61.0601 48.8501 62.9901L73.6401 87.7801C77.5501 91.6901 83.8801 91.6901 87.7801 87.7801C91.6901 83.8701 91.6901 77.5401 87.7801 73.6401L62.9901 48.8501C61.0601 46.9201 61.0601 43.7901 62.9901 41.8601Z" fill="black"/>
                </svg>
            </div>
            <Carousel
                autoFocus={true}
                emulateTouch={true}
                swipeable={true}
                infiniteLoop={true}
                showThumbs={false}
                useKeyboardArrows={true}
                centerMode={true}
                swipeScrollTolerance={200}>
                <div className="image-item-container">
                    <div className="image-container">
                        <img src={pic1} />
                    </div>
                    <div className="comment-container">
                        <p className="comment">Legend 1</p>
                    </div>
                </div>
                <div className="image-item-container">
                    <div className="image-container">
                        <img src={pic2} />
                    </div>
                    <div className="comment-container">
                        <p className="comment">Legend 2</p>
                    </div>
                </div>
                <div className="image-item-container">
                    <div className="image-container">
                        <img src={pic3} />
                    </div>
                    <div className="comment-container">
                        <p className="comment">Legend 3sdkljfhs lkjfhs dkfjsh dlkfjsh ldkfjhs ldfkjshd flkjshd flksjhdf ksjhf lskjdfh lskdj hfslkjfhs lkfjhs lkdfjhs lkdfjhs ldkfjhs ldkfjhs ldkfjhsl dkfhslkfjh sldkfjsh kfjhs dflkjshd lfkjshflk jdshlfkjsh dflkjh sdflkjsdh flksjfh lskdfjh sldkfhs lkfjhs dlfkjsh flkjsdhf lksjhf lksjhf lskfj h</p>
                    </div>
                </div>
            </Carousel>
        </div>
    )
}

export default MyGallery
