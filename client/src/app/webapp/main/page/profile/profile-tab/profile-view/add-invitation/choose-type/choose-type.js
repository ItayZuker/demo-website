import React, {useContext, useEffect, useState} from "react";
import {CreateInvitationContext} from "../../../../../../../../../context/add-invitation-context";
import "./choose-type.scss";

const ChooseType = () => {

    const {
        stage,
        setStage,
    } = useContext(CreateInvitationContext)

    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(true);
    }, [])

    return (
        <div className={'choose-type-container ' + (active ? 'active' : '')}>
            <div className='type-container talk'>
                <p>Talk</p>
            </div>
            <div className='type-container event'>
                <p>Event</p>
            </div>
        </div>
    )
};

export default ChooseType;