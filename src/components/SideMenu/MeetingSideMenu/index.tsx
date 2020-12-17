import React, { FunctionComponent, CSSProperties } from "react";
import { Link } from "react-router-dom";

import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

import { SCHEDULE_MEETING } from "../../../constants/routes";

import MeetingList from "./MeetingList";

const style: CSSProperties = {
  //   height: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const buttonsContainerStyle: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "row",
};

const schButtonStyle: CSSProperties = {
  flex: 1,
  margin: 5,
  color: "green",
  fontWeight: 600,
};

const MeetingSideMenu: FunctionComponent = () => (
  <div style={style}>
    <MeetingList />
    <div style={buttonsContainerStyle}>
      <Link to={SCHEDULE_MEETING} style={{ flex: 1, display: "flex" }}>
        <Button variant="light" style={schButtonStyle}>
          <FaPlus />
          Schedule
        </Button>
      </Link>
    </div>
  </div>
);

export default MeetingSideMenu;
