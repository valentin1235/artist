import { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Music from "./pages/music/music.js";
import Login from "./pages/login/login.js";
class Routes extends Component {
    render() {
        return (
            <Router>
                <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/music" component={Music} />
                </Switch>
            </Router>
        );
    }
}
export default Routes;