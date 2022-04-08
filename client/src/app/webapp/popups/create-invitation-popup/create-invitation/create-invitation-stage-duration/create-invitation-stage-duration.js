import React, {useContext, useEffect, useState} from "react";
import {CreateInvitationContext} from "../../../../../../context/create-invitation-context";
import Button from "../../../../../../components/button/button";
import "./create-invitation-stage-duration.scss";

const CreateInvitationStageDuration = () => {

    /* Global Variables */
    const {
        invitation,
        setTitle,
        setMessage,
        setStage,
        setInvitation,
        getTime,
        followingWeek,
        minimumDelay,
    } = useContext(CreateInvitationContext);

    /* Local Variables */
    const [next, setNext] = useState(false);

    /* Triggers */
    useEffect(() => {
        if (next) {
            setStage('invitation-time-start');
        }
    }, [next]);

    useEffect(() => {
        setTitle('Time Limit')
        setMessage(prevState => {
            return {...prevState,
                one: {
                    string: 'Select a time limit for your chat invitation:',
                    highlight: false,
                },
                two: {
                    string: '',
                    highlight: false,
                }};
        });
        setInvitation(prevState => {
            return {...prevState,
                start: getTime(followingWeek[0], minimumDelay),
                duration: {
                    set: true,
                    metric: 30,
                    string: '30 Minutes',
                    unlimited: false
                }
            }
        });
    }, []);

    /* Functions */
    const selectDuration = (limit) => {
        if (limit === 'unlimited') {
            setInvitation(prevState => {
                return {...prevState,
                    duration: {
                        set: true,
                        metric: null,
                        string: limit,
                        unlimited: true
                    }
                }
            });
        } else {
            setInvitation(prevState => {
                return {...prevState,
                    duration: {
                        set: true,
                        metric: limit,
                        string: `${limit} Minutes`,
                        unlimited: false
                    }
                }
            });
        }
    };

    /* JSX Output */
    return (
        <div className='create-invitation-stage-duration-container'>
            <div className='selection-container'>
                <div className='duration-container'>
                    <div
                        onClick={() => selectDuration(10)}
                        className={'inner-duration-container ' + (invitation.duration.metric === 10 ? 'selected' : '')}>
                        <p>
                            <span className='value'>10</span>
                            <span className='unit'>Minutes</span></p>
                    </div>
                </div>
                <div className='duration-container'>
                    <div
                        onClick={() => selectDuration(30)}
                        className={'inner-duration-container ' + (invitation.duration.metric === 30 ? 'selected' : '')}>
                        <p>
                            <span className='value'>30</span>
                            <span className='unit'>Minutes</span></p>
                    </div>
                </div>
                <div className='duration-container'>
                    <div
                        onClick={() => selectDuration(60)}
                        className={'inner-duration-container ' + (invitation.duration.metric === 60 ? 'selected' : '')}>
                        <p>
                            <span className='value'>1</span>
                            <span className='unit'>Hour</span></p>
                    </div>
                </div>
                <div className='duration-container'>
                    <div
                        onClick={() => selectDuration('unlimited')}
                        className={'inner-duration-container ' + (invitation.duration.unlimited ? 'selected' : '')}>
                        <p>
                            <span className='value'>No limit</span></p>
                    </div>
                </div>
            </div>
            <Button
                isActive={invitation.duration.set}
                loading={false}
                value={'Next'}
                callback={setNext}/>
        </div>
    )
};

export default CreateInvitationStageDuration;