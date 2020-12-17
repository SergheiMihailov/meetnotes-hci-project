import React, { FunctionComponent, CSSProperties, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import { setCurrentMeetingIdAction } from "../../../../redux/modules/meetings/reducers";
import { Meeting } from "../../../../typings";
import { MEETING } from "../../../../constants/routes";

import RecordingControl from "./RecordingControl";

const style: CSSProperties = {
  padding: 10,
  marginTop: 10,
  marginBottom: 10,
  display: "flex",
  flexDirection: "row",
};

const recordedStyle: CSSProperties = {
  ...style,
  backgroundColor: "black",
  color: "white",
};

const hoveredStyle: CSSProperties = {
  ...style,
  backgroundColor: "lightgray",
  transition: "background-color 0.5s",
};

const MeetingCard: FunctionComponent<any> = (props: {
  meeting: Meeting;
  isOngoing: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  return (
    <Link
      to={`${MEETING}/${props.meeting.id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <Card
        style={
          isHovered ? hoveredStyle : props.isOngoing ? recordedStyle : style
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => dispatch(setCurrentMeetingIdAction(props.meeting.id))}
      >
        <div style={{ flex: 2 }}>
          <div>
            {props.meeting.startTime} - {props.meeting.endTime} :{" "}
            {props.meeting.title}
          </div>
          <div>Participants: {props.meeting.participant_ids.join(", ")}</div>
          <div>Date: {props.meeting.date}</div>
        </div>
        {props.isOngoing ? (
          <RecordingControl meetingId={props.meeting.id} />
        ) : null}
      </Card>
    </Link>
  );
};

export default MeetingCard;
