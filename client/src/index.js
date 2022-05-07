import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { GlobalContextComponent } from "./context/global-context.js"
import App from "./app/app"

ReactDOM.render(
    <BrowserRouter>
        <GlobalContextComponent>
            <App />
        </GlobalContextComponent>
    </BrowserRouter>,
    document.getElementById("root")
)
