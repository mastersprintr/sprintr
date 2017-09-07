import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
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
            <div id="loginBackground">
                <MuiThemeProvider>
                    <div>
                        <div class="quarterWindow"></div>
                        <Paper id="loginPaper" style={styles.loginPaper}>
                            <Paper id="loginLogo" style={styles.loginLogo} zDepth={0} circle={true}>                                                 
                                <img class="icon icons8-Running" width="50" height="50" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAF1klEQVR4Xu2d/VkUMRDGZyqQDsAKlAqUCtQKhAqUCsQKxArECsQKhAqECoQKlArG54Usz96xt8kk2Xxd8g883GZ37/3tfGSSLEy9ZVWAs169X5w6gMwPQQfQAWRWIPPluwV0AJkVyHz5bgEdQF4FRGSPiD4Q0Wsiemnu5oqILojoKzPfLHmHW20BIvKFiD5aBD5l5uOlIGwtABH5PXribfpeMfO+7SCfz7cSgIicGrej0QzuyGYtmvPdH7t1AIzP/6NW6qHD89gxYRsB+Dz9A6/oVrCNADS+f91QoseCbQQgnu7nwWczR9Us6slCvliqviLSAaQSe+o6IoJB1gvPe7hm5mGw5nmK1W7baAE9CEd5dDxP0tNQT+HQzYi3y8yXAafBeXysIHoKWvxATETgb18R0VtTLBvr/o+IzokIPv2ndoCkjAXRff/wRYqMAeZJ/0REh4onHSAABDDwu7U5WsIiT36RADyFnxIa1gE3A/Hw+8ZmrokaD8rRQ3Z0bcrRqIS2X46OKPy60AOI70sLaTW3DQdkdUELCj/1dc+I6HNpILIASCz8OoyiQCQFICLwswiu+JmzwTUdMzNgZG3JADhmHDYx7kzaifT0me1gh8/PmPnI4bjFDkkJAE/9L89vgoEXMhKkmffNWNMwPvCt7eBUiAsnnvcV3C0ZACMaVhpgYOXaIPwJM6PfxiYiABvi1g5s13C9Ye1xqQG4WsGtEd7qo40l+FrWoFf0iRZXEEkBOFiBs/AjV4T5XaztCW1ZrCAHgCkrgKtBQLQ+8WOVRQSlim+hypv+F8x8EOlczqdJDmDNCpx8/NS3EZEdIsLTj5+xWnIryAUAaeROSOATEWQuGFPEbMmtIAuAUMUCJ1Vsl09qBbUC+GHmCGxi+nye1AqqAxAh7cRo2jaKfjce9PlQdO1TI4CQQRfERxaGxVlzDbUiuCKniR1XsaeOqwpAhLTzvuwgIkh33zsIBwCYkNGAuNQkF9UAMGknnlzfQdctM9/3NXPNNitw4DN5iKq2VBOA0LRzxa8rrEALoj0AEQZdcAsrxTpzTrgXW0DuACI8rZO5vXFFqLTGhNCWBUQYdGFCfuPylgUgNAcAS0awmc63WXe1GHeEyR7NXMWm+2kOAIR546m+SgwzyIO1YKbN1y2prll8FiQi2lm0gRUGXXu2hVmbwBrXh7QV1VbNknSUMmZn8MbXbBnAkXZ+wdPKgrrVAMDHBT0OuoLUSdC5BgA+QRilA6Ses+tCE+hrvUQNAOCDfQZMVUAoHoCp3fiWIYqHUAUAA8F3c13REGoCAFeE9M5nFVyxEIoFgNHpVBANmIwvEkKRAEx9BjNfkyuYzYgVkyq71jRj9YDiIBQHYCT+sN4HQgPESkpp6jf4TFumKApCMQCMoBATe7vWF1tBNIxsn0wNmmlK9NHUbpKufJiz0mAAoe9eULgQWAAgPC5RH/qaug3+rgnQsCqAy9pqAjAItVE4ZYC+YebnWdWP8cashBYwaLU/t1xEGaCzF+xqswAnwRQBena2LIV11ATASfyxaCJiq6Rm25gx3GcNALBp41AzyTEKzphImV3/E/sNWFqrKRkAZrSQ52OPmHdZ2RajOoDVRwYbNoa3oJyHCG8KeO1bgNbkUh7vsDf5yYKtlPeHawW7oNQ3rLmeiPy1bGGqPwvSCJLyWMeV1Mn2AWz67s1agEMKesfMMTf4eT1fTQJwXM646JuwXGm0CsBlJYV1yaKriCHHtQrAtns+e/YTbSQcQn+Jvo6b+NRljSXutck01GEvQRHBt0kLcNxJU0TwbRWAy8s7igi+rQKw7SEuJvg2B8Ax9y8m+LYIwPZC7qKCb4sAbLl/UcG3KQAigj1deIPKXCsq+LYGwPbuh+KCbzMATO6Puv9cKy74tgTAVngrMvi2BMD2j9mKDL7NAFiqSJbqvE2Wo1OJF+M6HUAMFQPO0QEEiBejawcQQ8WAc3QAAeLF6NoBxFAx4BwdQIB4Mbr+ByspWX+PnqKgAAAAAElFTkSuQmCC"/>
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
                                    type="submit"
                                    onClick={this.onClick}/>
                            </form>                      
                        </Paper>
                        <div id="loginFooter"><a href="https://icons8.com">Icon pack by Icons8</a></div>
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
