import React, { CSSProperties, FunctionComponent } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getCurrentMeeting } from "../../../../redux/modules/meetings/selectors";
import Agenda from "./Agenda";
import Share from "./Share";
import Tasks from "./Tasks";
import Transcript from "./Transcript";

const style: CSSProperties = {
  flex: 3,
  backgroundColor: "lightgray",
  display: "flex",
  flexDirection: "column",
};

const contentContainerStyle: CSSProperties = {
  padding: 10,
  overflowY: "scroll",
  maxHeight: "50vh",
  flex: 1,
};

const MeetingContent: FunctionComponent<any> = (meetingId: string) => {
  const meeting = useSelector(getCurrentMeeting);
  return (
    <div style={style}>
      <Tabs
        defaultActiveKey="transcript"
        id="uncontrolled-tab-example"
        style={{ backgroundColor: "white" }}
      >
        <Tab eventKey="transcript" title="Notes & Transcript">
          <div style={contentContainerStyle}>
            <Transcript meetingId={meeting.id} />
          </div>
        </Tab>
        <Tab eventKey="tasks" title="Tasks">
          <div style={contentContainerStyle}>
            <Tasks items={meeting.tasks} meetingId={meeting.id} />
          </div>
        </Tab>
        <Tab eventKey="agenda" title="Agenda">
          <div style={contentContainerStyle}>
            <Agenda items={meeting.agenda} meetingId={meeting.id} />
          </div>
        </Tab>
        <Tab eventKey="share" title="Share">
          <div style={contentContainerStyle}>
            <Share />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default MeetingContent;
