import {green400, green700} from "material-ui/styles/colors";

// console.log(colors)

const style = {
    "login-paper": {
        width: 400,
        margin: 'auto',
        textAlign: 'center',
        // "vertical-align": 'middle',
        color: green700,
        padding: 40
    },
    "full-window": {
        height:"100vh",
        backgroundColor: green400
    },
    "quarter-window": {
        height:"20vh",
    },
    field: {
        margin: 10,
        width: 'auto',
        display: 'inline-block'
    },
    loginGroup: {
        marginTop: 50,
        marginBottom: 50,        
    },
    h1: {
        textAlign: 'center',
        fontFamily: 'Titillium Web',
        fontWeight: "700",
        fontSize: 60,
        marginTop: -20
    },
    hintStyle: {
        // color: "#fff"
    },
    "login-button": {
        borderRadius: 25,
        backgroundColor: green700
    },
    "login-button-overlay": {
        borderRadius: 25,
        marginTop: 30
    },
    "login-logo": {
        height: 70,
        width: 70,
        padding: 10,
        backgroundColor: green700,
        margin: "auto"
    },
    underlineFocusStyle: {
        borderColor: green400
    },
    floatingLabelFocusStyle: {
        color: green400
    }
};

module.exports = style;