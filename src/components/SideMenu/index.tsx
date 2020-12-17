import React, { FunctionComponent, CSSProperties } from "react";
import DropDownMenu from "./DropdownMenu";
import MeetingSideMenu from "./MeetingSideMenu";

const style: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  marginRight: 20,
  background: "lightgray",
};

const SideMenu: FunctionComponent = () => (
  <div style={style}>
    <DropDownMenu />
    <MeetingSideMenu />
  </div>
);

export default SideMenu;
