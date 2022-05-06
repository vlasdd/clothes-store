import React from "react";
import ReactDom from "react-dom";
import App from "./App"
import "./style.scss"
import { BrowserRouter } from "react-router-dom"
import { ContextProvider } from "./CartContext"
import { Provider } from "react-redux"
import store from "./redux/store"

ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <ContextProvider>
                <App />
            </ContextProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
)