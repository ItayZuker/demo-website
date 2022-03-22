import React from "react";
import "./daily-invitations.scss";

const DailyInvitations = (props) => {

    return (
        <div className='daily-invitations-container'>
            <div className='title-container'>
                <p>{props.data.day}</p>
            </div>
        </div>
    )
};

export default DailyInvitations;