import React from "react";
import { Meteor } from "meteor/meteor";

export default class AddLink extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      url: ""
    }
  }
  onSubmit(e) {
    e.preventDefault();
    // const url = this.state.url; These are the same this
    const { url } = this.state; // object destructing way

    if (url) {
      Meteor.call("links.insert", url, (error, response) => {
        if(!err) {
          this.setState({ url: "" });
        }
      });
    }
  }
  onChange(e) {
    this.setState({
      url: e.target.value.trim()
    });
  }
  render() {
    return (
      <div>
        <p>Add Link</p>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input
            value={this.state.url}
            type="text"
            placeholder="Add a url here"
            onChange={this.onChange.bind(this)}/>
          <button>Add Link</button>
        </form>
      </div>
    );
  }
}
