import {Meteor} from "meteor/meteor";
import {Tracker} from "meteor/tracker";

import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, browserHistory} from "react-router";

import SignUp from "./../imports/ui/SignUp";
import Links from "./../imports/ui/Links";
import NotFound from "./../imports/ui/NotFound";
import Login from "./../imports/ui/Login";

const noAuthRequiredPages = ["/","/signup"];
const authRequiredPages = ["/links"];

const onEnterPublicPage = () => {
  if(Meteor.userId()) {
    browserHistory.replace("/links");
  }
}
const onEnterPrivatePage = () => {
  if(!Meteor.userId()) {
    browserHistory.replace("/");
  }
}

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={SignUp} onEnter={onEnterPublicPage}/>
    <Route path="/links" component={Links} onEnter={onEnterPrivatePage}/>
    <Route path="*" component={NotFound} onEnter={onEnterPublicPage}/>
  </Router>
);

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = noAuthRequiredPages.includes(pathname);
  const isAuthenticatedPage = authRequiredPages.includes(pathname);

  if (isAuthenticated && isUnauthenticatedPage) {
    browserHistory.replace("/links");
  } else if (!isAuthenticated && isAuthenticatedPage) {
    browserHistory.replace("/");
  }

});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById("app"));
});
