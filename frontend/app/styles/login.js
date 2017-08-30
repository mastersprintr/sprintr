import {greenA700, teal900} from "material-ui/styles/colors";

const style = {
    loginPaper: {
        width: 400,
        margin: "auto",
        textAlign: "center",
        color: teal900,
        padding: "40px 40px 80px",
        fontFamily: "Titillium Web"
    },    
    loginLogo: {
        height: 70,
        width: 70,
        padding: 10,
        backgroundColor: greenA700,
        margin: "auto"
    },
    loginButton: {
        borderRadius: 25,
        backgroundColor: greenA700,
        width: 256,
        fontFamily: 'Titillium Web',
        fontWeight: 100
    },
    loginButtonOverlay: {
        borderRadius: 25,
        height: 40,
        marginTop: 30
    },
    loginButtonLabel: {
        textTransform: "capitalize",
        fontSize: 18
    },
    underlineFocusStyle: {
        borderColor: greenA700
    },
    floatingLabelStyle: {
        color: greenA700
    }
};

module.exports = style;
