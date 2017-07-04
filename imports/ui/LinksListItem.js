import React from "react";
import Clipboard from "clipboard";

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

  componentWillUnMount() {
    this.clipboard.destory();
  }

  render() {
    return (
      <div>
        <p>{this.props.url}</p>
        <p>{this.props.shortUrl}</p>
        <button ref="copy" data-clipboard-text={this.props.shortUrl}>{this.state.copied ? "Copied" : "Copy" }</button>
      </div>
    )
  }
}
