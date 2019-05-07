import React, { Component } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import axios from "axios";
import { NavLink, Link, withRouter } from "react-router-dom";

class UsersList extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    console.log("hihihi");

    axios
      .get("http://localhost:5555/api/users")
      .then(res => {
        this.setState({ users: res.data });
        console.log("res", res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  // logout = e => {
  //   e.preventDefault();
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user_id");
  //   window.location = "/";
  // };

  handleLogout = e => {
    e.preventDefault();

    const endpoint = "http://localhost:5555/api/auth/logout";
    axios
      .get(endpoint, this.state)
      .then(res => {
        console.log("LOGOUT RESPONSE", res);
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        this.props.history.push("/");
      })
      .catch(error => {
        console.error("LOGOUT ERROR", error);
      });
  };

  render() {
    if (!this.state.users.length)
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    return (
      <div>
        <div>
          <NavLink exact to="/" onClick={this.handleLogout}>
            LOGOUT
          </NavLink>
        </div>
        <div>
          {this.state.users.map(user => (
            <div key={user.id}>
              <h2>{user.username}</h2>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default axiosWithAuth(UsersList);
