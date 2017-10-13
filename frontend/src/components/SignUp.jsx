import React from "react";
import PropTypes from "prop-types";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Dialog from "material-ui/Dialog";

import AppActions from "../actions/AppActions.jsx";
import styles from "../styles/login.js";
import Axios from "axios";

export default class SignUp extends React.Component {
    constructor(props) {
        super(props)
        const fromState = props.location.state;
        this.state = {
            username: "",
            password: "",
            isDialogBoxIsOpen: false,
            redirectToReferrer: true
        }
        this.dialogMsg = "";
    }

    onClick = () => {
        if (this.state.username === "" && this.state.password === "") {
            this.dialogMsg = "Username and Password required!";
            this.setState({isDialogBoxIsOpen: true});
        } else {
            var params = new URLSearchParams();
            params.append('username', this.state.username);
            params.append('password', this.state.password);

             Axios.post("/api/api/users", params)
            .then((res) => {
                this.dialogMsg = "Sign up successful";
                this.setState({isDialogBoxIsOpen: true});
                setTimeout(() => {
                    this.props.history.push("/");
                }, 1000);
            }).catch((err) => {
                if (err.response.status === 403) {
                    this.dialogMsg = "Account " + this.state.username + " already Exists!";
                    this.setState({isDialogBoxIsOpen: true});
                } else if (err.response.status === 500) {
                    this.dialogMsg = "Internal Server Error!\n" + err.response.data;
                    this.setState({isDialogBoxIsOpen: true});
                }
            });
        }
    }

    handleChange = (e) => {
        if (e.target.name === "username") {
            this.setState({username: e.target.value})
        } else if (e.target.name === "password") {
            this.setState({password: e.target.value})
        } else if (e.target.name === "team") {
            this.setState({team: e.target.value})
        }
    }

    handleClose = () => {
        this.setState({isDialogBoxIsOpen: false});
    }

    render = () => {
        return (
            <div>
                <MuiThemeProvider>
                    <div >
                        <div class="halfquarterWindow"></div>
                        <Paper id="loginPaper" style={styles.loginPaper}>
                            <Paper id="loginLogo" style={styles.loginLogo} zDepth={0} circle={true}>                                                 
                                <img class="icon icons8-Running" width="50" height="50" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAF1klEQVR4Xu2d/VkUMRDGZyqQDsAKlAqUCtQKhAqUCsQKxArECsQKhAqECoQKlArG54Usz96xt8kk2Xxd8g883GZ37/3tfGSSLEy9ZVWAs169X5w6gMwPQQfQAWRWIPPluwV0AJkVyHz5bgEdQF4FRGSPiD4Q0Wsiemnu5oqILojoKzPfLHmHW20BIvKFiD5aBD5l5uOlIGwtABH5PXribfpeMfO+7SCfz7cSgIicGrej0QzuyGYtmvPdH7t1AIzP/6NW6qHD89gxYRsB+Dz9A6/oVrCNADS+f91QoseCbQQgnu7nwWczR9Us6slCvliqviLSAaQSe+o6IoJB1gvPe7hm5mGw5nmK1W7baAE9CEd5dDxP0tNQT+HQzYi3y8yXAafBeXysIHoKWvxATETgb18R0VtTLBvr/o+IzokIPv2ndoCkjAXRff/wRYqMAeZJ/0REh4onHSAABDDwu7U5WsIiT36RADyFnxIa1gE3A/Hw+8ZmrokaD8rRQ3Z0bcrRqIS2X46OKPy60AOI70sLaTW3DQdkdUELCj/1dc+I6HNpILIASCz8OoyiQCQFICLwswiu+JmzwTUdMzNgZG3JADhmHDYx7kzaifT0me1gh8/PmPnI4bjFDkkJAE/9L89vgoEXMhKkmffNWNMwPvCt7eBUiAsnnvcV3C0ZACMaVhpgYOXaIPwJM6PfxiYiABvi1g5s13C9Ye1xqQG4WsGtEd7qo40l+FrWoFf0iRZXEEkBOFiBs/AjV4T5XaztCW1ZrCAHgCkrgKtBQLQ+8WOVRQSlim+hypv+F8x8EOlczqdJDmDNCpx8/NS3EZEdIsLTj5+xWnIryAUAaeROSOATEWQuGFPEbMmtIAuAUMUCJ1Vsl09qBbUC+GHmCGxi+nye1AqqAxAh7cRo2jaKfjce9PlQdO1TI4CQQRfERxaGxVlzDbUiuCKniR1XsaeOqwpAhLTzvuwgIkh33zsIBwCYkNGAuNQkF9UAMGknnlzfQdctM9/3NXPNNitw4DN5iKq2VBOA0LRzxa8rrEALoj0AEQZdcAsrxTpzTrgXW0DuACI8rZO5vXFFqLTGhNCWBUQYdGFCfuPylgUgNAcAS0awmc63WXe1GHeEyR7NXMWm+2kOAIR546m+SgwzyIO1YKbN1y2prll8FiQi2lm0gRUGXXu2hVmbwBrXh7QV1VbNknSUMmZn8MbXbBnAkXZ+wdPKgrrVAMDHBT0OuoLUSdC5BgA+QRilA6Ses+tCE+hrvUQNAOCDfQZMVUAoHoCp3fiWIYqHUAUAA8F3c13REGoCAFeE9M5nFVyxEIoFgNHpVBANmIwvEkKRAEx9BjNfkyuYzYgVkyq71jRj9YDiIBQHYCT+sN4HQgPESkpp6jf4TFumKApCMQCMoBATe7vWF1tBNIxsn0wNmmlK9NHUbpKufJiz0mAAoe9eULgQWAAgPC5RH/qaug3+rgnQsCqAy9pqAjAItVE4ZYC+YebnWdWP8cashBYwaLU/t1xEGaCzF+xqswAnwRQBena2LIV11ATASfyxaCJiq6Rm25gx3GcNALBp41AzyTEKzphImV3/E/sNWFqrKRkAZrSQ52OPmHdZ2RajOoDVRwYbNoa3oJyHCG8KeO1bgNbkUh7vsDf5yYKtlPeHawW7oNQ3rLmeiPy1bGGqPwvSCJLyWMeV1Mn2AWz67s1agEMKesfMMTf4eT1fTQJwXM646JuwXGm0CsBlJYV1yaKriCHHtQrAtns+e/YTbSQcQn+Jvo6b+NRljSXutck01GEvQRHBt0kLcNxJU0TwbRWAy8s7igi+rQKw7SEuJvg2B8Ax9y8m+LYIwPZC7qKCb4sAbLl/UcG3KQAigj1deIPKXCsq+LYGwPbuh+KCbzMATO6Puv9cKy74tgTAVngrMvi2BMD2j9mKDL7NAFiqSJbqvE2Wo1OJF+M6HUAMFQPO0QEEiBejawcQQ8WAc3QAAeLF6NoBxFAx4BwdQIB4Mbr+ByspWX+PnqKgAAAAAElFTkSuQmCC"/>
                            </Paper>
                            <h1>Sprintr</h1> 
                            <p>Sign up for Sprintr and get your sprints setup!</p>
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
                                <RaisedButton label="Sign me up!" 
                                    primary={true} 
                                    labelStyle={styles["loginButtonLabel"]}                                        
                                    style={styles["loginButtonOverlay"]} 
                                    overlayStyle={styles["loginButton"]} 
                                    buttonStyle={styles["loginButton"]}
                                    onClick={this.onClick}/>
                            </form>
                        </Paper>
                        <Dialog
                            title={this.dialogMsg}
                            modal={false}
                            open={this.state.isDialogBoxIsOpen}
                            onRequestClose={this.handleClose}>
                        </Dialog>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

SignUp.propTypes = {
    location: PropTypes.object,
    history: PropTypes.object
};