import React, {useContext} from "react";
import {GlobalContext} from "../context/global-context";
import Webapp from "./webapp/webapp";
import Website from "./website/website";
import './app.scss';

const App = () => {

    const {
        login,
    } = useContext(GlobalContext);

    /* JSX Output */
    if (login) {
        return <Webapp />
    } else {
        return <Website />
    }
};

export default App;