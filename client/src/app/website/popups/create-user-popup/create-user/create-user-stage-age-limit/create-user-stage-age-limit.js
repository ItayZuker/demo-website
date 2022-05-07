import React, { useContext, useEffect } from "react"
import { CreateUserContext } from "../../../../../../context/create-user-context"
import { GlobalContext } from "../../../../../../context/global-context"
import AgeLimitRejectStage from "./age-limit-reject-stage/age-limit-reject-stage"
import AgeLimitLegalStage from "./age-limit-legal-stage/age-limit-legal-stage"
import AgeLimitBirthdayStage from "./age-limit-birthday-stage/age-limit-birthday-stage"
import "./create-user-stage-age-limit.scss"

const CreateUserStageAgeLimit = () => {
    /* Global Variables */
    const {
        setMessage,
        stage,
        subStage,
        setTitle
    } = useContext(CreateUserContext)

    const {
        geoData
    } = useContext(GlobalContext)

    /* Triggers */
    useEffect(() => {
        activateAgeLimit()
    }, [])

    /* Functions */
    const activateAgeLimit = () => {
        if (geoData.ageLimit) {
            setTitle(`Are you +${geoData.ageLimit} ?`)
            setMessage(prevState => {
                return {
                    ...prevState,
                    one: {
                        string: "Please confirm your age",
                        highlight: true
                    },
                    two: {
                        string: "",
                        highlight: false
                    }
                }
            })
        }
    }

    /* JSX Output */
    if (stage !== "age-limit") {
        return <></>
    } else {
        return (
            <div className="create-user-stage-age-limit-container">
                {subStage === "reject" ? <AgeLimitRejectStage /> : <></>}
                {subStage === "legal" ? <AgeLimitLegalStage /> : <></>}
                {subStage === "birthday" ? <AgeLimitBirthdayStage /> : <></>}
            </div>
        )
    }
}

export default CreateUserStageAgeLimit
