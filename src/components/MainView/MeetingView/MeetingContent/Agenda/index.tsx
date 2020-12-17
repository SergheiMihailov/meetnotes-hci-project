import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Accordion, Button, Card, Form } from "react-bootstrap";
import ContentEditable from "react-contenteditable";
import { FaPlus } from "react-icons/fa";

import { updateMeetingAction } from "../../../../../redux/modules/meetings/reducers";
import { getMeetingById } from "../../../../../redux/modules/meetings/selectors";

type AgendaItem = {
  wasDiscussed: boolean;
  title: string;
  content: string;
};

const Agenda: FunctionComponent<any> = (props: {
  items: AgendaItem[];
  meetingId: string;
}) => {
  const dispatch = useDispatch();
  const meeting = useSelector(getMeetingById(props.meetingId));

  const addTopic = () => {
    dispatch(
      updateMeetingAction({
        ...meeting,
        agenda: [
          ...meeting.agenda,
          {
            wasDiscussed: false,
            title: "New Topic (edit me)",
            content: "What should be discussed? (edit me)",
          },
        ],
      })
    );
  };

  return (
    <div>
      {" "}
      <Button variant="success" onClick={addTopic} style={{ margin: 10 }}>
        <FaPlus />
        {"  "}Add topic
      </Button>
      <Accordion defaultActiveKey="0">
        {props.items.map((item: AgendaItem, key) => (
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey={String(key)}>
              <Card.Header
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <ContentEditable
                    tagName="pre"
                    html={item.title}
                    disabled={false}
                    onChange={(e: any) => {
                      dispatch(
                        updateMeetingAction({
                          ...meeting,
                          agenda: [
                            ...meeting.agenda.slice(0, key),
                            { ...meeting.agenda[key], title: e.target.value },
                            ...meeting.agenda.slice(key + 1),
                          ],
                        })
                      );
                    }}
                  />
                </div>
                <Button
                  variant="light"
                  onClick={(e: any) => {
                    dispatch(
                      updateMeetingAction({
                        ...meeting,
                        agenda: [
                          ...meeting.agenda.slice(0, key),
                          {
                            ...meeting.agenda[key],
                            wasDiscussed: !meeting.agenda[key].wasDiscussed,
                          },
                          ...meeting.agenda.slice(key + 1),
                        ],
                      })
                    );
                    e.stopPropagation();
                  }}
                >
                  <Form.Check label="Discussed" checked={item.wasDiscussed} />
                </Button>
              </Card.Header>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={String(key)}>
              <Card.Body>
                <ContentEditable
                  tagName="pre"
                  html={item.content}
                  disabled={false}
                  onChange={(e: any) => {
                    dispatch(
                      updateMeetingAction({
                        ...meeting,
                        agenda: [
                          ...meeting.agenda.slice(0, key),
                          { ...meeting.agenda[key], content: e.target.value },
                          ...meeting.agenda.slice(key + 1),
                        ],
                      })
                    );
                  }}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </div>
  );
};

export default Agenda;
