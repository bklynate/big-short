import React from "react";
import Clipboard from "clipboard";
import { Meteor } from "meteor/meteor";
import moment from "moment";

export default class LinksListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    }
  }

  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);
    this.clipboard.on("success", () => {
      this.setState({
        copied: true
      })
      console.log(this.state.copied)
      setTimeout(() => {
        this.setState({
          copied: false
        })
        console.log(this.state.copied)
      }, 400);
    }).on("error", () => {
      alert("Your browser doesn't support this feature - Welcome to 2017 it's time to upgrade")
    })
  }

  renderStats() {
    const visitMessage = this.props.visitedCount === 1 ? "visit" : "visits";
    let visitedMessage = null;
    let momentNow = moment(this.props.lastVisitedAt);

    if(typeof this.props.lastVisitedAt === "number") {

      visitedMessage = `(visited ${ momentNow.fromNow() })`;
    }
    return <p>{this.props.visitedCount} {visitMessage} {visitedMessage}</p>

  }

  componentWillUnMount() {
    this.clipboard.destory();
  }

  render() {
    console.log(this.props.visible)

    return (
      <div>
        <p>{this.props.url}</p>
        <a href={this.props.shortUrl} target="_blank">{this.props.shortUrl}</a>
        <p>{this.props.visible.toString()}</p>
        <p>Last Visited: {this.renderStats()}</p>
        <button ref="copy" data-clipboard-text={this.props.shortUrl}>{this.state.copied ? "Copied" : "Copy" }</button>
        <button onClick={() => {
          Meteor.call("links.setVisibility", this.props._id, !this.props.visible)}}>{this.props.visible ? "Hide" : "Unhide"}
        </button>
      </div>
    );
  }
}
