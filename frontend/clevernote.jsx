import React from "react";
import ReactDOM from "react-dom";
import {login, logout} from "./util/session_api_util"
document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    window.login = login 
    window.logout = logout
    ReactDOM.render(<h1>Welcome to CleverNote</h1>, root);
});