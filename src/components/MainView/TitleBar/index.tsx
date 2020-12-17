import React, { FunctionComponent, CSSProperties } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Button } from "react-bootstrap";

import {
  HOME,
  SCHEDULE_MEETING,
  MEETING,
  SETTINGS,
  FEED,
} from "../../../constants/routes";
import {
  getMeetingsState,
  getCurrentMeeting,
} from "../../../redux/modules/meetings/selectors";

const style: CSSProperties = {
  height: 50,
  background: "lightgray",
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 10,
};

const titleStyle: CSSProperties = {
  flex: 6,
  fontSize: 24,
  padding: 5,
  paddingLeft: 25,
};

const buttonStyle: CSSProperties = {
  flex: 1,
  fontSize: 16,
  borderRadius: 0,
  fontWeight: 600,
};

const TitleBar: FunctionComponent = () => {
  const history = useHistory();
  const currentMeeting = useSelector(getCurrentMeeting);
  let title = "";

  switch (history.location.pathname) {
    case HOME: {
      title = "Welcome to MeetNotes";
      break;
    }
    case SCHEDULE_MEETING: {
      title = "Schedule Meeting";
      break;
    }
    case history.location.pathname.match(MEETING + ".*")
      ? history.location.pathname
      : "": {
      title = currentMeeting.title;
      break;
    }
    case SETTINGS: {
      title = "(Work in progress) Settings";
      break;
    }
    case FEED: {
      title = "(Work in progress) Feed";
      break;
    }
    default: {
      title =
        "(Work in progress) " +
        history.location.pathname.split("/").splice(-1)[0];
    }
  }

  return (
    <div style={style}>
      <div style={titleStyle}>{title}</div>
      {history.location.pathname !== HOME ? (
        <Button
          variant="secondary"
          style={buttonStyle}
          onClick={() => history.goBack()}
        >
          {`< Back`}
        </Button>
      ) : null}
    </div>
  );
};

export default TitleBar;
