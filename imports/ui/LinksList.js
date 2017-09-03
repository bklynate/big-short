import React from "react";
import { Tracker } from "meteor/tracker";
import { Links } from "./../api/links";
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import FlipMove from "react-flip-move";

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
      const links = Links.find({
        visible: Session.get("showVisible")
      }).fetch();
      this.setState({ links });
    });
  }

  componentWillUnmount() {
    console.log("LinkList is NO longer showing");
    this.linksTracker.stop();
  }

  renderLinkListItems() {
    if(this.state.links.length === 0) {
      return (
        <div className="item__no-link-message">
          <p>
            No links present, please add a new link
          </p>
        </div>
      )
    } else {
      return this.state.links.map((link) => {
        const shortUrl = Meteor.absoluteUrl(link._id);
        return (
          <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>
        )
      });
    }
  }

  render() {
    return (
      <div>
        <div>
          <FlipMove maintainContainerHeight={true}>
            {this.renderLinkListItems()}
          </FlipMove>
        </div>
      </div>
    );
  }
}
