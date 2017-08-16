import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {cyan500} from 'material-ui/styles/colors';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import style from './css/style.js';

export default class Login extends React.Component {

    render() {
        return (

            <div>
                <MuiThemeProvider>
                    <Paper style={style.paper} zDepth={2} rounded={true}>
                        <h1 style={style.h1} >Sprintr</h1>
                        <div style={style.loginGroup}>
                            <form>
                                <TextField name="username" floatingLabelText="Username"/><br/>
                                <TextField name="password" type="password" floatingLabelText="Password"/><br/>
                                <RaisedButton label="Login" primary={true} style={style.buttonSpacing}/>
                            </form>
                        </div>
                    </Paper>
                </MuiThemeProvider>
            </div>
        );
    }
}