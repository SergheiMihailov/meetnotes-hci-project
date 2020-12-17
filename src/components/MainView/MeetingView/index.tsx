import React, { FunctionComponent, CSSProperties } from "react";
import { useSelector } from "react-redux";

import MeetingMetadata from "./MeetingMetadata";
import MeetingContent from "./MeetingContent";
import {
  getMeetingsState,
  getCurrentMeeting,
} from "../../../redux/modules/meetings/selectors";

const style: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  // height: "100%",
};

const headerStyle: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
};

const MeetingView: FunctionComponent = () => {
  const currentMeeting = useSelector(getCurrentMeeting);
  return (
    <div style={style}>
      <div style={headerStyle}>
        <MeetingMetadata meetingId={currentMeeting.id} />
      </div>
      <MeetingContent meetingId={currentMeeting.id} />
    </div>
  );
};
export default MeetingView;
