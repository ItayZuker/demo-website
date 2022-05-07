import React, { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../../../../../context/global-context"
import { CreateInvitationContext } from "../../../../../../context/create-invitation-context"
import Button from "../../../../../../components/button/button"
import InputTextArea from "../../../../../../components/input-text-area/input-text-area"
import "./create-invitation-intro.scss"

const CreateInvitationIntro = () => {
    /* Global Variables */
    const {
        invitation,
        setInvitation,
        setTitle,
        setMessage,
        setStage,
        setError
    } = useContext(CreateInvitationContext)

    const {
        setDetails,
        logout
    } = useContext(GlobalContext)

    /* Local Variables */
    const [intro, setIntro] = useState("")
    const [submit, setSubmit] = useState(false)
    const [loading, setLoading] = useState(false)

    /* Triggers */
    useEffect(() => {
        if (submit) {
            submitInvitation()
        }
    }, [submit])

    useEffect(() => {
        updateIntro(intro)
    }, [intro])

    useEffect(() => {
        updateStageIntro()
    }, [])

    /* Functions */
    const updateInvitations = (data) => {
        setDetails(prevState => {
            return {
                ...prevState,
                invitations: data.invitations
            }
        })
    }

    const handleData = async (data) => {
        setLoading(false)
        if (data.expiredAt) {
            logout()
        } else if (data.success) {
            updateInvitations(data)
            setStage("invitation-success")
        } else {
            setError(true)
        }
    }

    const handleErr = () => {
        setLoading(false)
        setStage("invitation-error")
    }

    const verifyData = () => {
        return new Promise((resolve) => {
            resolve()
        })
    }

    const getInvitation = () => {
        return {
            type: invitation.type,
            duration: invitation.duration,
            repeat: invitation.repeat,
            intro: invitation.intro.string,
            start: {
                timeStamp: invitation.start.timeStamp.getTime()
            },
            end: {
                unlimited: invitation.end.unlimited,
                timeStamp: invitation.end.timeStamp ? invitation.end.timeStamp.getTime() : null
            }
        }
    }

    const submitInvitation = async () => {
        setLoading(true)
        try {
            await verifyData()
            const token = window.localStorage.getItem("token")
            const res = await fetch("/profile-view/create-chat-invitation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token,
                    invitation: getInvitation()
                })
            })
            const data = await res.json()
            handleData(data)
        } catch (err) {
            handleErr(err)
        }
    }

    const updateStageIntro = () => {
        setTitle("Intro")
        setMessage({
            string: "Add an intro for your invitation:",
            highlight: false
        })
    }

    const updateIntro = (introString) => {
        setInvitation(prevState => {
            return {
                ...prevState,
                intro: {
                    set: true,
                    string: introString
                }
            }
        })
    }

    /* JSX Output */
    return (
        <div className={"create-invitation-intro-container " + (loading ? "loading" : "")}>
            <div className='selection-container'>
                <InputTextArea
                    valueCallback={setIntro}
                    typeLimit={300}/>
            </div>
            <Button
                isActive={true}
                loading={false}
                value={"Create Invitation"}
                callback={setSubmit}/>
        </div>
    )
}

export default CreateInvitationIntro
