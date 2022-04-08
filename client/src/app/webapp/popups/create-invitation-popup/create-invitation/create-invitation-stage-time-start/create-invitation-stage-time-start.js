import React, {useContext, useEffect, useState} from "react";
import {CreateInvitationContext} from "../../../../../../context/create-invitation-context";
import InputTime from "../../../../../../components/input-time/input-time";
import Button from "../../../../../../components/button/button";
import "./create-invitation-stage-time-start.scss";

const CreateInvitationStageTimeStart = () => {

    const {
        invitation,
        setTitle,
        setMessage,
    } = useContext(CreateInvitationContext);


    const [next, setNext] = useState(false);

    useEffect(() => {
        if (next) {
            if (invitation.type === 'chat') {
                // setStage('invitation-repeat')  ;
            } else {
                // setStage('invitation-repeat');
            }
        }
    }, [next]);

    useEffect(() => {
        if (invitation.type === 'chat') {
            setTitle('Chat')
            setMessage(prevState => {
                return {...prevState,
                    one: {
                        string: 'When will the chat start?',
                        highlight: false,
                    },
                    two: {
                        string: '',
                        highlight: false,
                    }};
            });
        } else {
            setTitle('Date')
            setMessage(prevState => {
                return {...prevState,
                    one: {
                        string: 'When will you meet?',
                        highlight: false,
                    },
                    two: {
                        string: '',
                        highlight: false,
                    }};
            });
        }
    }, []);


    return (
        <div className='create-invitation-time-start-container'>
            <div className='selection-container'>
                <InputTime />
            </div>
            <Button
                isActive={false}
                loading={false}
                value={'Next'}
                callback={setNext}/>
        </div>
    )
};

export default CreateInvitationStageTimeStart;