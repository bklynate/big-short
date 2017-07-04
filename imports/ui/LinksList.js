import React from "react";
import { Tracker } from "meteor/tracker";
import { Links } from "./../api/links";
import { Meteor } from "meteor/meteor";

import LinksListItem from "./LinksListItem";

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
      const shortUrl = Meteor.absoluteUrl(link._id);
      return (
        <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>
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
