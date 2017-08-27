import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";
import "./../imports/startup/simple-schema-configuration";
import "./../imports/api/users";
import { Links } from "./../imports/api/links";
import moment from "moment";

Meteor.startup(() => {
  let momentNow = moment();
  // code to run on server at startup
  WebApp.connectHandlers.use((request, response, next) => {
    const _id = request.url.slice(1);
    const link = Links.findOne({ _id });

    if(link) {
      response.statusCode = 302;
      response.setHeader("Location", link.url);
      response.end();
      Meteor.call("links.trackVisit", _id);
    } else {
      next();
    }
  });

  WebApp.connectHandlers.use((request, response, next) => {
    console.log("Hey from middleware")
    // Sets a status code
    // response.statusCode = 404;

    // Sets a header
    // response.setHeader("deez-nutz-og", "my stuff was here!");

    // Allow you to write to the html body
    // response.write("<h1>stfu when grown folks talking</h1>");

    // Ends the cycle
    // response.end()
    next();
  });
  console.log("the situation was dire... decisions had to be made..");
});
