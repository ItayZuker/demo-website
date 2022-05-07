import React, { useEffect, useContext } from "react"
import InputCharacter from "./input-character/input-character"
import { LoginContext } from "../../../../../../../context/login-context"
import "./input-password.scss"

const InputPassword = (props) => {
    /* Global Variables */
    const {
        password,
        setPassword
    } = useContext(LoginContext)

    /* Triggers */
    useEffect(() => {
        if (password.size > 0) {
            buildPasswordInput(password.size)
        }
    }, [password.size])

    /* Functions */
    const buildPasswordInput = async (size) => {
        const newPasswordArray = await buildNewPasswordArray(size)
        setPassword(prevState => {
            return { ...prevState, array: newPasswordArray }
        })
    }

    const buildNewPasswordArray = (size) => {
        return new Promise(resolve => {
            const array = [] // lint fix not sure - array to CONST from LET
            for (let i = 0; i < size; i++) {
                array.push({ character: "", index: i })
            }
            resolve(array)
        })
    }

    /* JSX Output */
    return (
        <div className={"input-password-container " + (props.isActive ? "active " : "") + (props.loading ? "loading" : "")}>
            {password.array.map((item, i) => {
                return <InputCharacter
                    key={i}
                    index={i}
                    isActive={props.isActive}
                />
            })}
        </div>
    )
}

export default InputPassword
