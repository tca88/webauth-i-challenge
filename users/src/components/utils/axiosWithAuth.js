import React from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/";

axios.interceptors.request.use(function(requestConfig) {
  //   const token = localStorage.getItem("password");
  //   console.log(token);
  //   requestConfig.headers.authorization = token;
  console.log(typeof localStorage.getItem("password"));
  requestConfig.headers.username = localStorage.getItem("username");
  requestConfig.headers.password = localStorage.getItem("password");
  console.log("Header", requestConfig);
  return requestConfig;
});

export default function(Component) {
  return class Authenticated extends React.Component {
    render() {
      const token = localStorage.getItem("password");
      const notLoggedIn = <h3>Please login to see users</h3>;

      return <>{token ? <Component {...this.props} /> : notLoggedIn}</>;
    }
  };
}
