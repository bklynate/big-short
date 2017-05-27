import React from "react";
import { Link } from "react-router";
import {Accounts} from "meteor/accounts-base"
export default class SignUp extends React.Component {
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

    Accounts.createUser({email, password}, (err) => {
      console.log("Signup callback", err);
    })
    // this.setState({
    //   error: "Something went wrong."
    // })
  }

  render() {
    return (
      <div>
        <p>Hello from Signup</p>

        {this.state.error ? <p>{this.state.error}</p> : undefined}

        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="email" ref="email" name="email" placeholder="Input email"/>
          <input type="password" ref="password" name="password" placeholder="Input your password"/>
          <button>Create Account</button>
        </form>
        <Link to="/">already have an account?</Link>
      </div>
    )
  }
}
