import React, {useContext, useState} from "react";
import "./create-invitation-stage-type.scss";
import {CreateInvitationContext} from "../../../../../../context/create-invitation-context";

const CreateInvitationStageType = () => {

    const {
        typeChatInfo,
        typeEventInfo
    } = useContext(CreateInvitationContext);

    const [hoverType, setHoverType] = useState('');

    const handleMouseLeave = () => {
        setHoverType('');
    };

    const handleMouseEnter = (type) => {
        setHoverType(type);
    };

    return (
        <div className='create-invitation-type-container'>
            <div className='selection-container'>
                <div
                    onMouseLeave={() => handleMouseLeave()}
                    onMouseEnter={() => handleMouseEnter('chat')}
                    className='chat-container'>
                </div>
                <div
                    onMouseLeave={() => handleMouseLeave()}
                    onMouseEnter={() => handleMouseEnter('event')}
                    className='event-container'>
                </div>
            </div>
            <div className='info-container'>
                <div className={'inner-container ' + hoverType}>
                    <p>{hoverType === 'chat' ? typeChatInfo : typeEventInfo}</p>
                </div>
            </div>
        </div>
    )
};

export default CreateInvitationStageType;