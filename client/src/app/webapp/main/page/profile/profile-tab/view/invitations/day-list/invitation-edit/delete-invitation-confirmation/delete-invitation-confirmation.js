import React, {useEffect, useState} from "react";
import Button from "../../../../../../../../../../../components/button/button";
import "./delete-invitation-confirmation.scss";

const DeleteInvitationConfirmation = (props) => {

    const [clickYes, setClickYes] = useState(false)
    const [clickNo, setClickNo] = useState(false)

    useEffect(() => {
        if (clickYes) {
            console.log("yes")
        }
    }, [clickYes])

    useEffect(() => {
        if (clickNo) {
            props.setClickDelete(false)
        }
    }, [clickNo])

    return (
        <div className="delete-invitation-confirmation">
            <p>Are you sure you want to delete this invitation?</p>
            <div className="buttons-container">
                <Button
                    unique="yes"
                    callback={setClickYes}
                    loading={false}
                    isActive={true}
                    value="Yes"/>
                <Button
                    unique="no"
                    callback={setClickNo}
                    loading={false}
                    isActive={true}
                    value="No"/>

            </div>
        </div>
    )
};

export default DeleteInvitationConfirmation