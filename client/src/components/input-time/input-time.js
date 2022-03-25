import React, {useContext, useState} from "react";
import {CreateInvitationContext} from "../../context/create-invitation-context";
import "./input-time.scss";

const InputTime = () => {

    const {
        invitation,
        setInvitation
    } = useContext(CreateInvitationContext);

    const clickAmPm = () => {
        if (invitation.start.ampm === 'am') {
            setInvitation(prevState => {
                return {...prevState, start: {...prevState.start, ampm: 'pm'}}
            })
        } else {
            setInvitation(prevState => {
                return {...prevState, start: {...prevState.start, ampm: 'am'}}
            })
        }

    }

    return (
        <div className='input-time-container'>
            <div className='hour-container'>
                <div className='plus-arrow'>

                </div>
                <div className='value-container'>

                </div>
                <div className='minus-arrow'>

                </div>
            </div>
            <span className='colon'>:</span>
            <div className='minuets-container'>
                <div className='plus-arrow'>

                </div>
                <div className='value-container'>

                </div>
                <div className='minus-arrow'>

                </div>
            </div>
            <div className='ampm-container'>
                <div
                    onClick={() => clickAmPm()}
                    className={'am ' + (invitation.start.ampm === 'am' ? 'active' : '')}><p>AM</p></div>
                <div
                    onClick={() => clickAmPm()}
                    className={'pm ' + (invitation.start.ampm === 'pm' ? 'active' : '')}><p>PM</p></div>
            </div>
        </div>
    )
};

export default InputTime;