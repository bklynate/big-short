import { Meteor } from "meteor/meteor";
import React from "react";
import { Router, Route, browserHistory } from "react-router";

import SignUp from "./../ui/SignUp";
import Links from "./../ui/Links";
import NotFound from "./../ui/NotFound";
import Login from "./../ui/Login";

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

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = noAuthRequiredPages.includes(pathname);
  const isAuthenticatedPage = authRequiredPages.includes(pathname);

  if (isAuthenticated && isUnauthenticatedPage) {
    browserHistory.replace("/links");
  } else if (!isAuthenticated && isAuthenticatedPage) {
    browserHistory.replace("/");
  }
}

export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={SignUp} onEnter={onEnterPublicPage}/>
    <Route path="/links" component={Links} onEnter={onEnterPrivatePage}/>
    <Route path="*" component={NotFound}/>
  </Router>
);
