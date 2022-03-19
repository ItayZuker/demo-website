import React, {useContext, useEffect, useState} from "react";
import {ProfileContext} from "../../../../../../../../context/profile-context";
import "./edit-birthday.scss";

const EditBirthday = () => {

    /* Global Variables */
    const {
        details,
        setTab,
    } = useContext(ProfileContext);

    /* Local Variables */
    const [edit, setEdit] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [closeEdit, setCloseEdit] = useState(false);

    /* Triggers */
    useEffect(() => {
        if (closeEdit) {
            setOpenEdit(false);
            setEdit(false);
        }
    }, [closeEdit]);

    useEffect(() => {
        if (openEdit) {
            setCloseEdit(false);
            setEdit(true);
        }
    }, [openEdit]);

    /* Functions */
    const goToSupport = () => {
        setTab('help')
    }

    /* JSX Output */
    return (
        <div className='edit-birthday-container'>
            <div className='title-container'>
                <h2>Birthday</h2>
            </div>
            <div className='birthday-container'>
                <p>{details.birthday.month.string + '.' + details.birthday.day.decimal + '.' + details.birthday.year.decimal}</p>
            </div>
            <div className='edit-container'>
                <p>To edit your birthday, Please contact <span className='support-button' onClick={() => goToSupport()}>support</span></p>
            </div>
        </div>
    )
};

export default EditBirthday;