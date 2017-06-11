import React from "react";
import { Accounts } from "meteor/accounts-base";
import {Links} from "./../api/links";
import LinksList from "./LinksList";

export default class Link extends React.Component {
  onSubmit(e) {
    e.preventDefault();
    const url = this.refs.url.value.trim();
    if (url) {
      Links.insert({url})
      this.refs.url.value = ""
    }
  }

  onLogout() {
    Accounts.logout();
    console.log("On Logout fired!")
  }

  render() {
    return (
      <div>
        <p>Hello from Link</p>
        <button onClick={this.onLogout.bind(this)}>Logout</button>
        <p>Add Link</p>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" ref="url" placeholder="Add a url here"/>
          <button>Add Link</button>
        </form>
        <LinksList/>
      </div>
    )
  }
}
