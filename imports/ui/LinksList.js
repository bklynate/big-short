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
      const allLinks = Links.find({}).fetch();
      allLinks.forEach((links) => {
        this.setState({
          links
        })
      })
    });
  }

  componentWillUnmount() {
    console.log("LinkList is NO longer showing");
    this.linksTracker.stop();
  }

  renderLinkListItems(listOfLinks) {
    if(listOfLinks.length < 0) {
      return (
        <div>
          <p>Add your first link today!</p>
        </div>
      )
    } else {
      return newLinkList = listOfLinks.map((link) => {
        return (
          <p key={link._id}>{link.url} - {link._id}</p>
        )
      })
    }
  }

  render() {
    const allLinks = Links.find({}).fetch();
    return (
      <div>
        <h1>ListLink is Alive!!</h1>
        {this.renderLinkListItems(allLinks)}
      </div>
    );
  }
}
