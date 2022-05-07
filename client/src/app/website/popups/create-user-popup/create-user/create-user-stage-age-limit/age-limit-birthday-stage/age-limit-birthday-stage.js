import React, { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../../../../../../context/global-context"
import { CreateUserContext } from "../../../../../../../context/create-user-context"
import InputDropdown from "../../../../../../../components/input-dropdown/input-dropdown"
import isLeapYear from "leap-year"
import Button from "../../../../../../../components/button/button"
import "./age-limit-birthday-stage.scss"

const AgeLimitBirthdayStage = () => {
    /* Global Variables */
    const {
        geoData
    } = useContext(GlobalContext)

    const {
        setTitle,
        setMessage,
        monthList,
        yearList,
        birthday,
        setBirthday,
        setError,
        setStage
    } = useContext(CreateUserContext)

    /* Locale Variables */
    const [loading, setLoading] = useState(false)
    const [dayArrayOne] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"])
    const [dayArrayTwo] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"])
    const [dayArrayThree] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29"])
    const [month, setMonth] = useState("")
    const [days, setDays] = useState([])
    const [day, setDay] = useState("")
    const [years, setYears] = useState([])
    const [year, setYear] = useState("")

    /* Triggers */
    useEffect(async () => {
        if (year) {
            await updateBirthDay()
        } else {
            await resetBirthDay()
            await resetYears()
        }
    }, [year])

    useEffect(async () => {
        if (day) {
            await resetBirthDay()
            await resetYears()
            await updateYears(day)
        } else {
            await resetBirthDay()
            await resetYears()
        }
    }, [day])

    useEffect(async () => {
        if (month) {
            await resetBirthDay()
            await resetYears()
            await resetDays()
            await updateDays(month)
        } else {
            await resetBirthDay()
            await resetYears()
            await resetDays()
        }
    }, [month])

    useEffect(() => {
        setTitle("Your birthday")
        setMessage(prevState => {
            return {
                ...prevState,
                one: {
                    string: "Please select your birthday:",
                    highlight: false
                },
                two: {
                    string: "",
                    highlight: false
                }
            }
        })
    }, [])

    /* Functions */
    const resetBirthDay = () => {
        return new Promise(resolve => {
            setBirthday(prevState => {
                return {
                    ...prevState,
                    confirmation: {
                        ...prevState.confirmation,
                        age: null
                    },
                    month: {
                        string: "",
                        short: "",
                        decimal: null
                    },
                    day: {
                        string: "",
                        short: "",
                        decimal: null
                    },
                    year: {
                        decimal: null
                    }
                }
            })
            resolve(true)
        })
    }

    const getAge = (dateOfBirth) => {
        return new Promise(resolve => {
            const diffMS = Date.now() - dateOfBirth.getTime()
            const ageDT = new Date(diffMS)
            const age = Math.abs(ageDT.getUTCFullYear() - 1970)
            resolve(age)
        })
    }

    const getMonthObject = (monthName) => {
        return new Promise(resolve => {
            switch (monthName.toLowerCase()) {
            case "january":
                resolve({ string: "january", short: "jan", decimal: 0 })
                break
            case "february":
                resolve({ string: "february", short: "feb", decimal: 1 })
                break
            case "march":
                resolve({ string: "march", short: "mar", decimal: 2 })
                break
            case "april":
                resolve({ string: "april", short: "apr", decimal: 3 })
                break
            case "may":
                resolve({ string: "may", short: "may", decimal: 4 })
                break
            case "june":
                resolve({ string: "june", short: "jun", decimal: 5 })
                break
            case "july":
                resolve({ string: "july", short: "jul", decimal: 6 })
                break
            case "august":
                resolve({ string: "august", short: "aug", decimal: 7 })
                break
            case "september":
                resolve({ string: "september", short: "sep", decimal: 8 })
                break
            case "october":
                resolve({ string: "october", short: "oct", decimal: 9 })
                break
            case "november":
                resolve({ string: "november", short: "nov", decimal: 10 })
                break
            case "december":
                resolve({ string: "december", short: "dec", decimal: 11 })
                break
            default:
                resolve({ string: "", short: "", decimal: null })
            }
        })
    }

    const getDayObject = (dateOfBirth) => {
        return new Promise(resolve => {
            const day1 = dateOfBirth.getDay()
            const decimal = dateOfBirth.getDate()
            switch (day1) {
            case 0:
                resolve({ string: "Sunday", short: "Sun", decimal })
                break
            case 1:
                resolve({ string: "Monday", short: "Mon", decimal })
                break
            case 2:
                resolve({ string: "Tuesday", short: "Tues", decimal })
                break
            case 3:
                resolve({ string: "Wednesday", short: "Wed", decimal })
                break
            case 4:
                resolve({ string: "Thursday", short: "Thurs", decimal })
                break
            case 5:
                resolve({ string: "Friday", short: "Fri", decimal })
                break
            case 6:
                resolve({ string: "Saturday", short: "Sat", decimal })
                break
            default:
                resolve({ string: "", short: "", decimal: null })
            }
        })
    }

    const updateBirthDay = async () => {
        const monthObject = await getMonthObject(month)
        const dayObject = await getDayObject(new Date(Number(year), monthObject.decimal, Number(day)))
        const age = await getAge(new Date(Number(year), monthObject.decimal, Number(day)))
        setBirthday(prevState => {
            return {
                ...prevState,
                confirmation: {
                    ...prevState.confirmation,
                    age
                },
                month: monthObject,
                day: dayObject,
                year: {
                    decimal: Number(year)
                }
            }
        })
    }

    const verifyBirthday = () => {
        return new Promise(resolve => {
            const limitIsLimit = geoData.ageLimit === birthday.confirmation.limit
            const ageOverLimit = birthday.confirmation.age >= geoData.ageLimit
            if (limitIsLimit && ageOverLimit) {
                resolve(true)
            } else {
                setError(true)
            }
        })
    }

    const verifyData = async () => {
        setLoading(true)
        const isVerify = await verifyBirthday()
        if (isVerify) {
            setStage("email")
        } else {
            setError(true)
        }
    }

    const updateYears = async (day) => {
        if (month === "February" && day === "29") {
            const array = [] // lint fix not sure - array to CONST from LET
            await yearList.forEach((year) => {
                const yearNumber = Number(year)
                const leapYear = isLeapYear(yearNumber)
                if (leapYear) {
                    array.push(year)
                }
            })
            setYears(array)
        } else {
            setYears(yearList)
        }
    }

    const resetYears = () => {
        return new Promise(resolve => {
            setYear("")
            setYears([])
            resolve(true)
        })
    }

    const resetDays = () => {
        return new Promise(resolve => {
            setDay("")
            setDays([])
            resolve(true)
        })
    }

    const getDays = (month) => {
        return new Promise(resolve => {
            switch (month) {
            case "January":
                resolve(dayArrayOne)
                break
            case "February":
                resolve(dayArrayThree)
                break
            case "March":
                resolve(dayArrayOne)
                break
            case "April":
                resolve(dayArrayTwo)
                break
            case "May":
                resolve(dayArrayOne)
                break
            case "June":
                resolve(dayArrayTwo)
                break
            case "July":
                resolve(dayArrayOne)
                break
            case "August":
                resolve(dayArrayOne)
                break
            case "September":
                resolve(dayArrayTwo)
                break
            case "October":
                resolve(dayArrayOne)
                break
            case "November":
                resolve(dayArrayTwo)
                break
            case "December":
                resolve(dayArrayOne)
                break
            default:
                resolve([])
            }
        })
    }

    const updateDays = async (month) => {
        const daysArray = await getDays(month)
        setDays(daysArray)
    }

    /* JSX Output */
    return (
        <div className="age-limit-birthday-stage-container">
            <InputDropdown
                isActive={true}
                loading={loading}
                value={month}
                placeholder={"Month"}
                array={monthList}
                valueCallback={setMonth}/>
            <InputDropdown
                isActive={month}
                loading={loading}
                value={day}
                placeholder={"Day"}
                array={days}
                valueCallback={setDay}/>
            <InputDropdown
                isActive={day}
                loading={loading}
                value={year}
                placeholder={"Year"}
                array={years}
                valueCallback={setYear}/>
            <Button
                isActive={month && day && year}
                loading={loading}
                value={"Next"}
                callback={() => verifyData()}/>
        </div>
    )
}

export default AgeLimitBirthdayStage
