import React from "react";
// import { Links } from "./../api/links";
import LinksList from "./LinksList";
import PrivateHeader from "./PrivateHeader";
import AddLink from "./AddLink";
import ListFilter from "./ListFilter";

export default () => {
  return (
   <div>
     <PrivateHeader title="Big Shorter"/>
     <ListFilter/>
     <AddLink/>
     <LinksList/>
   </div>
  )
}
