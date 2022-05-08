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

    const getTodayNextWeek = () => {
        const date = new Date()
        date.setDate(date.getDate() + 7)
        return date.getDate()
    }

    const checkTodayNextWeek = () => {
        return new Promise(resolve => {
            const todayDate = new Date()
            const invitationDate = new Date(invitation.start.timeStamp)
            const todayDay = todayDate.getDate()
            const invitationDay = invitationDate.getDate()
            if (invitationDay === todayDay) {
                const nowHour = todayDate.getHours()
                const invitationHour = invitationDate.getHours()
                if (invitationHour < nowHour) {
                    resolve(true)
                } else if (invitationHour === nowHour) {
                    const nowMinute = todayDate.getMinutes()
                    const invitationMinute = invitationDate.getMinutes()
                    if (invitationMinute < nowMinute) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                } else {
                    resolve(false)
                }
            } else {
                resolve(false)
            }
        })
    }

    const getStartTimeStamp = (day) => {
        const year = invitation.start.timeStamp.getFullYear()
        const monthIndex = invitation.start.timeStamp.getMonth()
        const hour = invitation.start.timeStamp.getHours()
        const minute = invitation.start.timeStamp.getMinutes()
        return new Date(year, monthIndex, day, hour, minute)
    }

    const getEndTimeStamp = (day) => {
        if (invitation.end.timeStamp) {
            const year = invitation.end.timeStamp.getFullYear()
            const monthIndex = invitation.end.timeStamp.getMonth()
            const hour = invitation.end.timeStamp.getHours()
            const minute = invitation.end.timeStamp.getMinutes()
            return new Date(year, monthIndex, day, hour, minute)
        } else {
            return null
        }
    }

    const getInvitation = async () => {
        const isNextWeek = await checkTodayNextWeek()
        let startTimeStamp,
            endTimeStamp
        if (isNextWeek) {
            const nextWeekDay = getTodayNextWeek()
            startTimeStamp = getStartTimeStamp(nextWeekDay).getTime()
            endTimeStamp = getEndTimeStamp(nextWeekDay).getTime()
        } else {
            startTimeStamp = invitation.start.timeStamp.getTime()
            if (invitation.end.timeStamp) {
                endTimeStamp = invitation.end.timeStamp.getTime()
            } else {
                endTimeStamp = null
            }
        }
        return {
            type: invitation.type,
            duration: invitation.duration,
            repeat: invitation.repeat,
            intro: invitation.intro.string,
            start: {
                timeStamp: startTimeStamp
            },
            end: {
                unlimited: invitation.end.unlimited,
                timeStamp: endTimeStamp
            }
        }
    }

    const submitInvitation = async () => {
        setLoading(true)
        try {
            await verifyData()
            const token = window.localStorage.getItem("token")
            const res = await fetch("/profile-view/create-invitation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token,
                    invitation: await getInvitation()
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
