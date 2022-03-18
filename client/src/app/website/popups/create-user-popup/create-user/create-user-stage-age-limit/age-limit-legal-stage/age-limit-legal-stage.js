import React, {useContext, useEffect, useState} from "react";
import {CreateUserContext} from "../../../../../../../context/create-user-context";
import Button from "../../../../../../../components/button/button";
import "./age-limit-legal-stage.scss";

const AgeLimitLegalStage = () => {

    const {
        subStage,
        setSubStage,
        birthday,
        setBirthday,
    } = useContext(CreateUserContext);

    const [confirmationTrue, setConfirmationTrue] = useState(false);
    const [confirmationFalse, setConfirmationFalse] = useState(false);

    useEffect(() => {
        if (confirmationFalse) {
            setSubStage('reject');
        } else if (confirmationTrue) {
            setBirthday(prevState => {
                return {...prevState, confirmation: {...prevState.confirmation, isLegal: true}};
            });
            setSubStage('birthday');
        }
    }, [confirmationTrue, confirmationFalse]);

    return (
        <div className='age-limit-legal-stage-container'>
            <Button
                loading={false}
                isActive={true}
                callback={setConfirmationTrue}
                value={'Yes'}/>
            <Button
                loading={false}
                isActive={true}
                callback={setConfirmationFalse}
                value={'No'}/>
        </div>
    )
};

export default AgeLimitLegalStage;