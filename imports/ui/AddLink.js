import React from "react";
import { Meteor } from "meteor/meteor";

export default class AddLink extends React.Component {
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     url: "Nate lives!"
  //   }
  // }
  onSubmit(e) {
    e.preventDefault();

    const url = this.refs.url.value.trim();

    if (url) {
      Meteor.call("links.insert", url);
      this.refs.url.value = "";
    }
  }

  render() {
    return (
      <div>
        <p>Add Link</p>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input
            // value={this.state.url}
            type="text"
            ref="url"
            placeholder="Add a url here"/>
          <button>Add Link</button>
        </form>
      </div>
    );
  }
}
