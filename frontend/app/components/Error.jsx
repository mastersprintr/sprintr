import React from "react";
import Redirect from "react-router-dom";

export default class Error extends React.Component {
    render() {
        return localStorage.getItem("username") ?
        <div class="centeredText">
            <h1>404 NOT FOUND</h1>
            You were logged in, hence the 404. If not, you <b>SHOULD</b> be redirected to login.
        </div> :
        <Redirect to="/login"/>;
    }
}
