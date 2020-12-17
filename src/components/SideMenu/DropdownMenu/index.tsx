import React, { FunctionComponent } from "react";
import { FaBars } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: 50,
  margin: 10,
};

const toggleStyle = {
  border: "none",
};

const DropDownMenu: FunctionComponent = () => (
  <Dropdown style={style}>
    <Dropdown.Toggle style={toggleStyle} id="dropdown-basic" variant="info">
      <FaBars />
      Meetnotes
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item href="/">Home</Dropdown.Item>
      <Dropdown.Item href="/feed">Feed</Dropdown.Item>
      <Dropdown.Header>Meetings</Dropdown.Header>
      <Dropdown.Item href="/schedule-meeting">Schedule meeting</Dropdown.Item>
      <Dropdown.Item href="/overview">Meetings overview</Dropdown.Item>
      <Dropdown.Header>Preferences</Dropdown.Header>
      <Dropdown.Item href="/profile">Profile</Dropdown.Item>
      <Dropdown.Item href="/settings">Settings</Dropdown.Item>
      <Dropdown.Item href="/sign-out">Sign out</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export default DropDownMenu;
