import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import getMuiTheme from "material-ui/styles/getMuiTheme";
// import {cyan500} from "material-ui/styles/colors";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import PropTypes from "prop-types";

import AppActions from "../actions/AppActions.jsx";
import styles from "../styles/login.js";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        const fromState = props.location.state;
        if (fromState) {
            console.log("You were redirected here from " + fromState.from.pathname + " because you were not logged in...");
        }

        this.state = {
            username: null,
            password: null,
            redirectToReferrer: true
        };
    }

    onClick = () => {
        // TODO: This should be processed on backend... @roomgee Replace this 'if' with some ajax call...
        if (this.state.username === "admin" && this.state.password === "pass") {
            AppActions.setUser({username: this.state.username});
            localStorage.setItem("username", this.state.username);

            // If user was wandering aimlessly on sprintr and redirected to login, this flag (if true) will
            // return the user to the last he page visited before redirection on successful login..
            this.state.redirectToReferrer && this.props.location.state ?
                this.props.history.push(this.props.location.state.from.pathname) :
                this.props.history.push("/");
        }
        else {
            console.log("Wrong username and password...");
        }
    }

    handleChange = (e) => {
        e.target.name === "username" ? this.setState({username: e.target.value}) : this.setState({password: e.target.value});
    }

    render() {
        return (
            <div>
              <MuiThemeProvider>
                    <div id="loginBackground">
                        <div class="quarterWindow"></div>
                        <Paper id="loginPaper" style={styles.loginPaper}>
                            <Paper id="loginLogo" style={styles.loginLogo} zDepth={0} circle={true}>
                                <img src="./images/logo.png"/>
                            </Paper>
                            <h1>Sprintr</h1>                         
                                <form>
                                    <TextField name="username" 
                                        onChange={this.handleChange} 
                                        floatingLabelText="Username" 
                                        underlineFocusStyle={styles.underlineFocusStyle} 
                                        floatingLabelStyle={styles.floatingLabelStyle}
                                        floatingLabelFocusStyle={styles.floatingLabelStyle}/>
                                    <TextField name="password" 
                                        type={"password"} 
                                        onChange={this.handleChange} 
                                        floatingLabelText="Password" 
                                        underlineFocusStyle={styles.underlineFocusStyle} 
                                        floatingLabelStyle={styles.floatingLabelStyle}
                                        floatingLabelFocusStyle={styles.floatingLabelStyle}/>
                                    <RaisedButton label="Log In" 
                                        primary={true} 
                                        labelStyle={styles["loginButtonLabel"]}                                        
                                        style={styles["loginButtonOverlay"]} 
                                        overlayStyle={styles["loginButton"]} 
                                        buttonStyle={styles["loginButton"]} 
                                        onClick={this.onClick}/>
                                </form>
                      
                        </Paper>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

Login.propTypes = {
    location: PropTypes.object,
    history: PropTypes.object
};
