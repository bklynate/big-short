import {Meteor} from "meteor/meteor";
import {Tracker} from "meteor/tracker";

import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, browserHistory} from "react-router"

import SignUp from "./../imports/ui/SignUp";
import Links from "./../imports/ui/Links";
import NotFound from "./../imports/ui/NotFound";
import Login from "./../imports/ui/Login";

const noAuthRequiredPages = ["/","/signup"];
const authRequiredPages = ["/links"];

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login}/>
    <Route path="/signup" component={SignUp}/>
    <Route path="/links" component={Links}/>
    <Route path="*" component={NotFound}/>
  </Router>
);

Tracker.autorun(()=>{
  const isAuthenticated = !!Meteor.userId();
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = noAuthRequiredPages.includes(pathname);
  const isAuthenticatedPage = authRequiredPages.includes(pathname);

  if(isAuthenticated === true && isUnauthenticatedPage){
    browserHistory.push("/links")
  }
  if(isAuthenticated === false && isAuthenticatedPage){
    browserHistory.push("/")
  }

});

Meteor.startup(()=> {
  ReactDOM.render(routes, document.getElementById("app"))
});
