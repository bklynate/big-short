import React from "react";
import Clipboard from "clipboard";

export default class LinksListItem extends React.Component {
  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);

    this.clipboard.on("success", () => {
      alert("Successfully copied url!")
    }).on("error", () => {
      alert("Your browser doesn't support this feature - Welcome to 2017 it's time to upgrade")
    })
  }
  componentWillUnMount() {
    this.clipboard.destory();
  }
  render() {
    return (
      <div>
        <p>{this.props.url}</p>
        <p>{this.props.shortUrl}</p>
        <button ref="copy" data-clipboard-text={this.props.shortUrl}>Copy</button>
      </div>
    )
  }
}
