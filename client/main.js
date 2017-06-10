import {Meteor} from "meteor/meteor";
import {Tracker} from "meteor/tracker";
import ReactDOM from "react-dom";
import {routes, onAuthChange} from "./../imports/routes/routes";
import {Links} from "./../imports/api/links";

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated)
});

Tracker.autorun(() => {
  const allLinks = Links.find({}).fetch();
  allLinks.forEach((item) => {
    console.log(item.url);
  })
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById("app"));
});
