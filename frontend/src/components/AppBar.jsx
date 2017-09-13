import React from "react";
import PropTypes from "prop-types";
import Paper from "material-ui/Paper";
import Avatar from "material-ui/Avatar";
import styles from "../styles/appBar.js";

export default class AppBar extends React.Component {
    
    render() {
        return (
            <div id="appBar">
                <div style={{float:'left'}}>
                 <Paper id="sprintrLogo" style={styles.sprintrLogo} zDepth={0} circle={true}>                                                 
                    <img class="icon icons8-Running" width="20" height="20" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADdUlEQVRoQ+2ZT1YaQRDGv2rZ6CbcIHiC4AnEHTObjGFcR08gniB6guAJJOtAQjbgTjyB5ASSE6gbzGLoyusRzDD2/KEZBnxPtnQz36/rq+qqgfDKP/TK9eMNYNURXG0EnGqJNugrgPLkIAY85hN0LodpD2Z1AL54cUOEYlAsM+55LHfSQqwMgFy7Q8BH3Ukz8ItbXSdNFFYHULPvwqc/FczMQ273ttcbwLXuCfROGwHGH253S2sOsI4WcipFFLZ2xaSqSJZDjHGtTUiVxAUahKPA4Af2uJxvEjuVoihsHTOjrvM1AwMC96XH5zPCfAjRAE/KKGHAnqynFa8stlgSJwjXepjRlGN5No/IuFwwAzARHlbhg4xO0Onfp0nWqDVGAPE1nB9IiSMMCVSJqvVKkF8ux487i0AYAcCtVgTE1cwNCn4gUEN6o0ZQkHDtUwBfok6QwX1u9fZMo2AGoJLHtfoE2lVVQyfcFxTRLoTFSsg9tC77JhDGAJMoVMInHhQhalYTRJ+ThC0SBXOAJFUHdlkwbpKWTb83jcLSAMi1rlQSx3j/Wlnwuf+BugNGe/Mm9HIAapYjiH5Gnj7zuSTuhAuBX5nA2lxgohN87w7Cv7kUAKpZt0SkbcaeWoXHkjppUbMaIDpOY7Moi2UP4Fp1AX/KivqcyVZXlVbAqRSpsNkJWilqU24A0/KqE8JRbbJr1YlJ9VHv1xpAShzhR7cZaxm3qk987+9Al+CZWyiqzZhnykqTE9M1mQPgk30oBC60IlSP1O4ezSMwaW32AABib+CMIbIDUNPYxmYF7V7HP7W4apQhRDYAT+PhhX/zBvv8A7tMEk0ifHhhhYwgEgGEa3OSD8PfqxGSPbnvT11q+NnYPNVdWJJ5/zli8z5ksn45AIzfPB5VZspezXKI0AwO8fO8wIriyxyAwdfsPTrapkwzCMlWN1FDXHASN6e1kC9cUjP2onKqJVEQt0FBSwcwtKZ+W+iOYGW1dnf6ZtroUYkRMPrViE0vZgTVVrd79UWekR+Azj6e3F70/VBuAOHePwv7qMjlBhAeclJ1pim8lQ9AaMQMTmUpNMYuyQXgRXPH/E22e4eLis/HQk/vUe9maj9hRzegmwAtPwKhrjSr5F3eQBM6RnLtG/r/NyqySt7cAExsMc+e5VtoHjUGa98ADA4t0y3/ABSwskC4vv8YAAAAAElFTkSuQmCC"/>
                </Paper>
                <h1>Sprintr</h1>
                </div>
                <div style={{float:'right'}}>
                    <h3>{this.props.username}</h3>
                    <Avatar style={styles.avatar}>
                        {this.props.username[0].toUpperCase()}
                    </Avatar>
                </div>
            </div>
        );
    }
}

AppBar.propTypes = {
    username: PropTypes.string
};
