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
      creatorId: this.userId,
      visible: true,
      visitedCount: 0,
      lastVisitedAt: null
    });
  },

  "links.setVisibility"(_id, visible) {
    if (!this.userId) {
      throw new Meteor.Error("not-authorized", "You are not authorized!")
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      visible: {
        type: Boolean
      }
    }).validate({ _id, visible})

    Links.update({
      _id,
      creatorId: this.userId
    }, {
      $set: { visible }
    });
  },

  "links.trackVisit"(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id})

    Links.update({ _id }, {
      $set: {
        lastVisitedAt: new Date().getTime()
      },
      $inc: {
        visitedCount: 1
      }
    });
  }
});
