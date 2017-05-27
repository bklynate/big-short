import React from "react";
import { Link } from "react-router";

export default class Login extends React.Component {
  render() {
    return (
      <div>
        <h1>Login Page</h1>
        <Link to="/signup">need an account?</Link>
      </div>
    );
  }
}
