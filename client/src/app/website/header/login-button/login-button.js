import React, { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../../../context/global-context"
import Button from "../../../../components/button/button"
import "./login-button.scss"

const LoginButton = () => {
    /* Global variables */
    const {
        media,
        popup,
        setPopup
    } = useContext(GlobalContext)

    /* Locale variables */
    const [tryLogin, setTryLogin] = useState(false)

    /* Triggers */
    useEffect(() => {
        if (tryLogin) {
            setPopup("login")
        }
    }, [tryLogin])

    useEffect(() => {
        if (popup !== "login") {
            setTryLogin(false)
        }
    }, [popup])

    /* JSX Output */
    if (media !== "desktop") {
        return <></>
    } else {
        return (
            <div className="login-button-container">
                <Button
                    isActive={true}
                    loading={false}
                    value={"Login"}
                    callback={setTryLogin}/>
            </div>
        )
    }
}

export default LoginButton
