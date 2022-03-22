import React, {useEffect, useState} from "react";
import "./invitation-day-tab.scss";

const InvitationDayTab = (props) => {

    const [chats, setChats] = useState(props.data.chats.length || 0);
    const [events, setEvents] = useState(props.data.events.length || 0)

    useEffect(() => {
        setChats(props.data.chats.length);
        setEvents(props.data.events.length);
    }, [props.data.chats, props.data.events]);

    /* JSC Output */
    return (
        <div className='invitation-day-tab-container'>
            <a>
                <p>{props.data.day}</p>
                <div className='arrow-container'>
                </div>
            </a>
        </div>
    )
};

export default InvitationDayTab;