import React, { FunctionComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Form } from "react-bootstrap";
import { FaPlus, FaRobot } from "react-icons/fa";
import ContentEditable from "react-contenteditable";

import { getMeetingById } from "../../../../../redux/modules/meetings/selectors";
import { updateMeetingAction } from "../../../../../redux/modules/meetings/reducers";

const TASK_KEYWORD = "to do ";

type Task = {
  done: boolean;
  description: string;
};

const identifyTasks = (text: string) => {
  const keyword = TASK_KEYWORD;
  let tasks: Task[] = [];
  let lastIndex = text.toLowerCase().search(keyword);
  while (lastIndex >= 0 && lastIndex < text.length - 1) {
    const taskIdentified = {
      done: false,
      description: text.substring(
        lastIndex + keyword.length,
        Math.min(lastIndex + keyword.length + 60, text.length)
      ),
    };
    tasks.push(taskIdentified);

    let indexIncrement = text
      .substring(lastIndex + keyword.length)
      .toLowerCase()
      .search(keyword);

    if (indexIncrement === -1) {
      break;
    }

    lastIndex = lastIndex + indexIncrement + keyword.length;
  }
  return tasks;
};

const Tasks: FunctionComponent<any> = (props: {
  meetingId: string;
  items: Task[];
}) => {
  const meeting = useSelector(getMeetingById(props.meetingId));
  const dispatch = useDispatch();

  const recognizeTasks = () => {
    dispatch(
      updateMeetingAction({
        ...meeting,
        tasks: [
          ...meeting.tasks,
          ...identifyTasks(meeting.transcript),
          ...identifyTasks(meeting.notesHtml),
        ],
      })
    );
  };

  const addTask = () => {
    dispatch(
      updateMeetingAction({
        ...meeting,
        tasks: [
          ...meeting.tasks,
          { done: false, description: "New Task (edit me)" },
        ],
      })
    );
  };

  return (
    <div>
      <Button variant="success" onClick={addTask} style={{ margin: 10 }}>
        <FaPlus />
        {"  "}Add task
      </Button>
      <Button variant="primary" onClick={recognizeTasks} style={{ margin: 10 }}>
        <FaRobot />
        {"  "} Recognize tasks from transcript and notes
        <i>(keyword: "{TASK_KEYWORD}"</i>)
      </Button>
      {meeting.tasks.map((item: Task, key) => (
        <Card body>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <ContentEditable
              tagName="pre"
              html={item.description}
              disabled={false}
              onChange={(e: any) => {
                dispatch(
                  updateMeetingAction({
                    ...meeting,
                    tasks: [
                      ...meeting.tasks.slice(0, key),
                      { ...meeting.tasks[key], description: e.target.value },
                      ...meeting.tasks.slice(key + 1),
                    ],
                  })
                );
              }}
            />
            <Button
              variant="light"
              onClick={(e: any) => {
                dispatch(
                  updateMeetingAction({
                    ...meeting,
                    tasks: [
                      ...meeting.tasks.slice(0, key),
                      { ...meeting.tasks[key], done: !meeting.tasks[key].done },
                      ...meeting.tasks.slice(key + 1),
                    ],
                  })
                );
                e.stopPropagation();
              }}
            >
              <Form.Check label="Done" checked={item.done} />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
export default Tasks;
