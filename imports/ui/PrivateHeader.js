import React from "react";
import { Accounts } from "meteor/accounts-base";

export default (props) => {
  return (
    <div>
      <p>{props.title}</p>
      <button onClick={() => Accounts.logout()}>Logout</button>
    </div>
  )
}
