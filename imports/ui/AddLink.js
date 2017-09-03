import React from "react";
import { Meteor } from "meteor/meteor";
import Modal from "react-modal";

export default class AddLink extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      url: "",
      modalOpen: false,
      error: ""
    }
  }
  onSubmit(e) {
    e.preventDefault();
    // const url = this.state.url; These are the same this
    const { url } = this.state; // object destructing way

    Meteor.call("links.insert", url, (error, response) => {
      if(!error) {
        this.handleModalClose();
      } else {
        this.setState({
          error: error.reason
        })
      }
    });
  }
  onChange(e) {
    this.setState({
      url: e.target.value.trim()
    });
  }
  handleModalClose() {
    this.setState({modalOpen: false, url: "", error: ""})
  }
  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalOpen}
          contentLabel="Add Link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal"
          >
          <h1>Add Link</h1>
          {this.state.error === "" ? "" : <p>{this.state.error} </p>}
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
            <input
              value={this.state.url}
              type="text"
              ref="url"
              placeholder="Add a url here"
              onChange={this.onChange.bind(this)}/>
            <button className="button">Add Link</button>
            {/* We add type=button to the cancel button to stop it from */}
            {/* submitting the form as it is the final button */}
            <button type="button" className="button button--cancel" onClick={this.handleModalClose.bind(this)}>Cancel</button>
          </form>
        </Modal>
        <button className="button" onClick={() => {this.setState({modalOpen: true})}}>Add Link+</button>
      </div>
    );
  }
}
