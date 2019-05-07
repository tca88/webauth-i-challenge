import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import axios from "axios";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.js";
import Login from "./components/PublicContent/Login.js";
import Signup from "./components/PublicContent/Signup.js";
import UsersList from "./components/GatedContent/UsersList.js";
import "./App.css";

axios.defaults.baseURL = process.env.API_URL || "http://localhost:5555/";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/signup" render={props => <Signup {...props} />} />
          <Route exact path="/" render={props => <Login {...props} />} />
          <PrivateRoute path="/users" component={UsersList} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
