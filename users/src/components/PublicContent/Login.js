import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleLogin = event => {
    event.preventDefault();

    const endpoint = "http://localhost:5555/api/auth/login";
    axios
      .post(endpoint, this.state)
      .then(res => {
        console.log("LOGIN RESPONSE", res);
        localStorage.setItem("password", res.data.password);
        localStorage.setItem("username", res.data.username);
        this.props.history.push("/users");
      })
      .catch(error => {
        console.error("LOGIN ERROR", error);
      });
  };

  handleInputChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleLogin}>
            <h2>LOGIN</h2>
            <input
              type="text"
              name="username"
              placeholder="USERNAME"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="PASSWORD"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
            <button>LOG IN</button>
            <div>
              <p>or</p>
              <Link to="/signup">Create an Account</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
