import React from "react";
import Login from "./Login.jsx";
import Error from "./Error.jsx";
import AppStore from "../stores/AppStore.jsx";
import AppActions from "../actions/AppActions.jsx";

import {Route,
        BrowserRouter as Router,
        Switch,
        Redirect,
        // withRouter
        } from "react-router-dom";
import PropTypes from "prop-types";

class Test1 extends React.Component {
    render() {
        return (<h1>Test1</h1>);
    }
}

class Test2 extends React.Component {
    render() {
        return (<h1>Test2</h1>);
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = AppStore.getState();
    }

    // Leaving these here for the future, not needed as of now...
    // componentDidMount() {
    //     AppStore.listen(this.storeChanged);
    // }

    // componentWillUnmount() {
    //     AppStore.unlisten(this.storeChanged);
    // }

    // storeChanged = (state) => {
    // }

    fakeLogout = () => {
        this.setState({
            username: null
        });
        AppActions.logout();
    }

    renderApp = () => {
        // Just automatically logout after 10 seconds for demo purposes...
        setTimeout(this.fakeLogout, 10000);

        return (
            <div>
                <h1>Logged in as {this.state.username}</h1>
                <br/>
                This Page automatically logs you out after 10 seconds... You can get out to reset the timer..
                <Switch>
                    <Route path="/app/test1" component={Test1}/>
                    <Route path="/app/test2" component={Test2}/>
                    <Route component={Error}/>
                </Switch>
            </div>
        );
    }

    render() {
        return this.state.username ? this.renderApp() :
            (<Redirect to={{
                pathname: "/login",
                state: {from: this.props.location}}}/>);
    }
}

App.propTypes = {
    location: PropTypes.object
};

export default class Main extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Redirect exact from='/' to='/app'/>
                    <Route path="/app" component={App}/>
                    <Route path="/login" component={Login}/>
                    <Route component={Error}/>
                </Switch>
            </Router>
        );
    }
}


