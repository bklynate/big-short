import React from "react";
import { Link } from "react-router";
import { Meteor } from "meteor/meteor";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ""
    }
  }

  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    Meteor.loginWithPassword({email}, password, (err) => {
      if (err) {
        this.setState({
          error: "Unable to login - email and/or password is wrong."
        });
      } else {
        this.setState({
          error: ""
        });
      }
    })
  }

  render() {
    return (
      <div>
        <h1>Big Short</h1>

        {this.state.error ? <p>{this.state.error}</p> : undefined}

        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="email" ref="email" name="email" placeholder="Input email"/>
          <input type="password" ref="password" name="password" placeholder="Input your password"/>
          <button>Login</button>
        </form>
        <Link to="/signup">need an account?</Link>
      </div>
    );
  }
}
