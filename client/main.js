import {Meteor} from "meteor/meteor";

import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, browserHistory} from "react-router"

import SignUp from "./../imports/ui/SignUp";
import Links from "./../imports/ui/Links";
import NotFound from "./../imports/ui/NotFound";
import Login from "./../imports/ui/Login";

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login}/>
    <Route path="/signup" component={SignUp}/>
    <Route path="/links" component={Links}/>
    <Route path="*" component={NotFound}/>
  </Router>
);
Meteor.startup(()=> {
  ReactDOM.render(routes, document.getElementById("app"))
});
