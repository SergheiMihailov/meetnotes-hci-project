import React, { FunctionComponent, CSSProperties } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";

import { getMeetingsState } from "../../../redux/modules/meetings/selectors";
import {
  createMeetingAction,
  setCurrentMeetingIdAction,
} from "../../../redux/modules/meetings/reducers";
import { MEETING } from "../../../constants/routes";
import { useHistory } from "react-router-dom";

const style: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  backgroundColor: "lightgray",
  padding: 10,
};

const ScheduleMeetingView: FunctionComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (event: any) => {
    const title = event.target.elements[0].value;
    const date = String(event.target.elements[1].value);
    const startTime = String(event.target.elements[2].value);
    const endTime = String(event.target.elements[3].value);
    const location = String(event.target.elements[4].value);
    const participants = event.target.elements[5].value.split(",");
    const meetingInfo = String(event.target.elements[6].value);

    const scheduledMeeting = {
      id: title + date,
      title: title.length === 0 ? "Unnamed meeting" : title,
      participant_ids: participants,
      date: date,
      startTime: startTime,
      endTime: endTime,
      location: location,
      audioAvailable: false,
      transcriptAvailable: false,
      transcript: "Start recording this meeting to get the transcript.",
      notesHtml: "Click to edit your meeting notes <--",
      summary: "",
      tasks: [],
      agenda: [],
      infoMeeting: meetingInfo,
    };

    dispatch(createMeetingAction(scheduledMeeting));
    dispatch(setCurrentMeetingIdAction(scheduledMeeting.id));
    history.push(`${MEETING}/${scheduledMeeting.id}`);
    event.preventDefault();
  };

  return (
    <div style={style}>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="meetingTitle">
          <Form.Label>Meeting title</Form.Label>
          <Form.Control type="text" placeholder="e.g. Ideation Workshop" />
        </Form.Group>
        <Form.Group controlId="dateTime">
          <Form.Label>Date & start/end time</Form.Label>
          <Form.Control type="date" data-date-format="yyyy/mm/dd" />
          <div style={{ display: "flex" }}>
            <div style={{ width: 200, margin: 10 }}>Start time:</div>
            <Form.Control type="time" />
            <div style={{ width: 200, margin: 10 }}>End time:</div>
            <Form.Control type="time" />
          </div>
        </Form.Group>
        <Form.Group controlId="meetingLocation">
          <Form.Label>Meeting location</Form.Label>
          <Form.Control
            type="text"
            placeholder="(e.g. HG-A023, Zoom link, etc.)"
          />
        </Form.Group>
        <Form.Group controlId="participants">
          <Form.Label>Participants</Form.Label>
          <Form.Control
            type="text"
            placeholder="alice@example.com, bob@example.com"
          />
          <Form.Check
            type="checkbox"
            label="E-mail invitations to participants"
          />
        </Form.Group>
        <Form.Group controlId="meetingInfo">
          <Form.Label>Information about the meeting :</Form.Label>
          <Form.Control
            type="text"
            placeholder="(e.g. Zoom password: XXXXXX)"
          />
        </Form.Group>
        <Button variant="secondary" type="submit">
          Schedule meeting
        </Button>
      </Form>
    </div>
  );
};

export default ScheduleMeetingView;
