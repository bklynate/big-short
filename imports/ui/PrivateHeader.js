import React from "react";
import { Accounts } from "meteor/accounts-base";

export default (props) => {
  return (
    <div className="header">
      <p className="header__logo">{props.title}</p>
      <button className="button button--link button--logout" onClick={() => Accounts.logout()}>Logout</button>
    </div>
  )
}
