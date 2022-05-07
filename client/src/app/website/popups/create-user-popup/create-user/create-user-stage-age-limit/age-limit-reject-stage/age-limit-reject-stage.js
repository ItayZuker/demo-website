import React, { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../../../../../../context/global-context"
import { CreateUserContext } from "../../../../../../../context/create-user-context"
import Button from "../../../../../../../components/button/button"
import "./age-limit-reject-stage.scss"

const AgeLimitRejectStage = () => {
    /* Global Variables */
    const {
        geoData,
        setPopup
    } = useContext(GlobalContext)

    const {
        setMessage,
        setTitle
    } = useContext(CreateUserContext)

    /* Local Variables */
    const [backToWebsite, setBackToWebsite] = useState(false)

    /* Triggers */
    useEffect(() => {
        setTitle("Sorry")
        setMessage(prevState => {
            return {
                ...prevState,
                one: {
                    string: "You are not allowed to register",
                    highlight: true
                },
                two: {
                    string: "",
                    highlight: false
                }
            }
        })
    }, [])

    useEffect(() => {
        if (backToWebsite) {
            setPopup("")
        }
    }, [backToWebsite])

    /* JSX Output */
    return (
        <div className="age-limit-reject-stage-container">
            <p>Unfortunately, regulations limit this app for people who are at list {geoData.ageLimit} years old. We appreciate your interest, and your honesty.</p>
            <Button
                isActive={true}
                loading={false}
                callback={setBackToWebsite}
                value={"Back to website"}/>
        </div>
    )
}

export default AgeLimitRejectStage
