import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp"
import "./../imports/startup/simple-schema-configuration";
import "./../imports/api/users";
import "./../imports/api/links";

Meteor.startup(() => {
  // code to run on server at startup
  WebApp.connectHandlers.use((request, response, next) => {
    console.log("Hey from middleware")
    // res.statusCode = 404;
    // res.setHeader("deez-nutz-og", "my stuff was here!");
    // res.write("<h1>stfu when grown folks talking</h1>");
    // res.end()
    next();
  })
  console.log("the situation was dire... decisions had to be made..");
});
