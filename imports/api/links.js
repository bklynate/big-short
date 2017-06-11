import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Links = new Mongo.Collection("links");

// this is a meteor publication
if (Meteor.isServer) {
  Meteor.publish('linksPub', function() {
    this.userId
    return Links.find({creatorId: this.userId});
  })
}
