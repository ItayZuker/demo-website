import React from "react"
import EditName from "./edit-name/edit-name"
import EditCountry from "./edit-country/edit-country"
import EditBirthday from "./edit-birthday/edit-birthday"
import EditGender from "./edit-gender/edit-gender"
import "./details.scss"

const Details = () => {
    /* JSX Output */
    return (
        <div className="details-container">
            <p>Your details are complete. If you want to update something, click the save button when you are done.</p>
            <EditName />
            <EditCountry />
            <EditGender />
            <EditBirthday />
        </div>
    )
}

export default Details
