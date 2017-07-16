import React from "react";
import {Session} from "meteor/session";

export default class ListFilter extends React.Component {
  render() {
    return (
      <div>
        <label>
          <input type="checkbox" onChange={(e)=>{Session.set("showVisible", !e.target.checked)}}/>
          show hidden links
        </label>
      </div>
    )
  }
}
