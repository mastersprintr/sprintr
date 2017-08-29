import {green400, green500, green600, green900} from "material-ui/styles/colors";

// console.log(colors)

const style = {
    "login-paper": {
        width: 400,
        margin: 'auto',
        textAlign: 'center',
        // "vertical-align": 'middle',
        color: green900,
        padding: 40
    },
    "full-window": {
        height:"100vh",
        /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#627d4d+0,1f3b08+100;Olive+3D */
        background: "#1B5E20", /* Old browsers */
        background: "-moz-linear-gradient(top, #1B5E20 0%, #43A047 100%)", /* FF3.6-15 */
        background: "-webkit-linear-gradient(top, #1B5E20 0%,#43A047 100%)", /* Chrome10-25,Safari5.1-6 */
        background: "linear-gradient(to bottom, #1B5E20 0%,#43A047 100%)", /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#1B5E20', endColorstr='#43A047',GradientType=0 )" /* IE6-9 */
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
        backgroundColor: green600,
        width: 256,
        fontFamily: 'Titillium Web',
        fontWeight: 100
    },
    "login-button-overlay": {
        borderRadius: 25,
        height: 40,
        marginTop: 30
    },
    "login-logo": {
        height: 70,
        width: 70,
        padding: 10,
        backgroundColor: green600,
        margin: "auto"
    },
    loginButtonLabel: {
        textTransform: "capitalize",
        fontSize: "18"
    },
    underlineFocusStyle: {
        borderColor: green400
    },
    floatingLabelFocusStyle: {
        color: green400
    }
};

module.exports = style;