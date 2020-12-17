import React, { CSSProperties, FunctionComponent, useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import { FaCalendarAlt, FaCaretDown, FaClock, FaPlay } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getMeetingsState } from "../../../../redux/modules/meetings/selectors";
import { Meeting } from "../../../../typings";
import MeetingCard from "../MeetingCard";

const style = {
  flex: 8,
};

const scrollableCardStyle: CSSProperties = {
  overflowY: "scroll",
  maxHeight: "45vh",
};

const MeetingList: FunctionComponent<any> = () => {
  const meetings = useSelector(getMeetingsState).meetings.sort(
    (a: Meeting, b: Meeting) => {
      if (a.date + a.startTime > b.date + b.startTime) {
        return -1;
      } else if (a.date + a.startTime === b.date + b.startTime) {
        return 0;
      }
      return 1;
    }
  );
  const now = new Date();
  const currDate = `${now.getFullYear()}-0${
    now.getMonth() + 1
  }-${now.getDate()}`;
  const currTime = `${now.getHours()}:${now.getMinutes()}`;

  const scheduledMeetings = meetings.filter(
    (meeting: Meeting) =>
      meeting.date > currDate ||
      (meeting.date === currDate && meeting.startTime > currTime)
  );

  const recentMeetings = meetings.filter(
    (meeting: Meeting) =>
      meeting.date < currDate ||
      (meeting.date === currDate && meeting.endTime < currTime)
  );

  const ongoingMeetings = meetings
    .filter((meeting: Meeting) => meeting.date === currDate)
    .filter(
      (meeting: Meeting) =>
        meeting.endTime >= currTime && meeting.startTime <= currTime
    );

  let [
    [recentMeetingsSearched, setRecentMeetingsSearched],
    [ongoingMeetingsSearched, setOngoingMeetingsSearched],
    [scheduledMeetingsSearched, setScheduledMeetingsSearched],
  ] = [
    useState(recentMeetings),
    useState(ongoingMeetings),
    useState(scheduledMeetings),
  ];

  return (
    <div style={style}>
      {ongoingMeetings.length > 0 ? (
        <Card>
          <div>
            <FaPlay />
            Ongoing ({ongoingMeetings.length})
            <FaCaretDown />
          </div>
          <Card.Body style={scrollableCardStyle}>
            {ongoingMeetings.map((meeting: Meeting) => (
              <MeetingCard meeting={meeting} isOngoing />
            ))}
          </Card.Body>
        </Card>
      ) : null}

      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            <div>
              <FaCalendarAlt />
              Scheduled ({scheduledMeetings.length})
              <FaCaretDown />
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body style={scrollableCardStyle}>
              <input
                placeholder="Search using a meeting's title"
                style={{ width: "100%" }}
                onChange={(e: any) => {
                  setScheduledMeetingsSearched([
                    ...scheduledMeetings.filter(
                      (meeting) => meeting.title.indexOf(e.target.value) !== -1
                    ),
                  ]);
                }}
              />
              {scheduledMeetingsSearched.length < scheduledMeetings.length ? (
                <div>
                  <div
                    style={{
                      padding: 10,
                      width: "100%",
                      backgroundColor: "#EEEEEE",
                    }}
                  >
                    {" "}
                    Search Results {scheduledMeetingsSearched.length}
                  </div>
                  {scheduledMeetingsSearched.map((meeting: Meeting) => (
                    <MeetingCard meeting={meeting} />
                  ))}
                  <div
                    style={{ width: "100%", borderBottom: "3px solid black" }}
                  ></div>
                </div>
              ) : null}
              {scheduledMeetings.map((meeting: Meeting) => (
                <MeetingCard meeting={meeting} />
              ))}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="2">
            <div>
              <FaClock />
              Recent ({recentMeetings.length})
              <FaCaretDown />
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body style={scrollableCardStyle}>
              <input
                placeholder="Search using a meeting's title"
                style={{ width: "100%" }}
                onChange={(e: any) => {
                  setRecentMeetingsSearched([
                    ...recentMeetings.filter(
                      (meeting) => meeting.title.indexOf(e.target.value) !== -1
                    ),
                  ]);
                }}
              />
              {recentMeetingsSearched.length < recentMeetings.length ? (
                <div>
                  <div
                    style={{
                      padding: 10,
                      width: "100%",
                      backgroundColor: "#EEEEEE",
                    }}
                  >
                    {" "}
                    Search Results {recentMeetingsSearched.length}
                  </div>
                  {recentMeetingsSearched.map((meeting: Meeting) => (
                    <MeetingCard meeting={meeting} />
                  ))}
                  <div
                    style={{ width: "100%", borderBottom: "3px solid black" }}
                  ></div>
                </div>
              ) : null}
              {recentMeetings.map((meeting: Meeting) => (
                <MeetingCard meeting={meeting} />
              ))}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

export default MeetingList;
