import React from "react";
import { Tracker } from "meteor/tracker";
import { Links } from "./../api/links";
import { Meteor } from "meteor/meteor"

export default class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }

  componentDidMount() {
    console.log("LinkList Component Did Mount Fired.")
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe("linksPub");
      const links = Links.find().fetch();
      this.setState({ links });
    });
  }

  componentWillUnmount() {
    console.log("LinkList is NO longer showing");
    this.linksTracker.stop();
  }

  renderLinkListItems() {
    return this.state.links.map((link) => {
      return (
        <p key={link._id}>{link.url} - {link._id}</p>
      )
    });
  }

  render() {
    return (
      <div>
        <p>Links List</p>
        <div>
          {this.renderLinkListItems()}
        </div>
      </div>
    );
  }
}
