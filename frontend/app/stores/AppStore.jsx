import alt from "../libs/alt.js";

import AppActions from "../actions/AppActions.jsx";

class AppStore {
    constructor() {
        this.bindActions(AppActions);
        this.state = this.getInitialState();
    }

    getInitialState() {
        return {
            username: localStorage.getItem("username")
        };
    }

    setUser = (data) => {
        this.setState({
            username: data.username
        });
    }

    logout = () => {
        localStorage.removeItem("username");
        this.setState(this.getInitialState());
    }
}

export default alt.createStore(AppStore, "AppStore");
