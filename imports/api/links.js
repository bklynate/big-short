import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import shortId from "shortid";

export const Links = new Mongo.Collection("links");

// this is a meteor publication
if (Meteor.isServer) {
  Meteor.publish("linksPub", function() {
    return Links.find({creatorId: this.userId});
  });
}

Meteor.methods({
  "links.insert"(url) {
    if (!this.userId) {
      throw new Meteor.Error("not-authorized", "You are not authorized!")
    }

    new SimpleSchema({
      url: {
        label: "Your link",
        type: String,
        regEx: SimpleSchema.RegEx.Url
      }
    }).validate({ url })

    Links.insert({
      _id: shortId.generate(),
      url,
      creatorId: this.userId
    });
  }
});
