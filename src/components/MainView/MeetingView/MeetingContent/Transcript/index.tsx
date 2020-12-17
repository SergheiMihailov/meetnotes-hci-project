import React, { FunctionComponent, CSSProperties } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContentEditable from "react-contenteditable";

import { getMeetingById } from "../../../../../redux/modules/meetings/selectors";
import { updateMeetingAction } from "../../../../../redux/modules/meetings/reducers";

const Transcript: FunctionComponent<any> = (props: { meetingId: string }) => {
  const meeting = useSelector(getMeetingById(props.meetingId));
  const dispatch = useDispatch();

  const onNotesEdit = (e: any) => {
    dispatch(updateMeetingAction({ ...meeting, notesHtml: e.target.value }));
  };

  const editableStyle: CSSProperties = {
    resize: "none",
    wordWrap: "break-word",
    overflowWrap: "break-word",
    whiteSpace: "normal",
    backgroundColor: "white",
    padding: 10,
  };

  const sectionStyle: CSSProperties = {
    flex: 1,
    borderRight: "1px solid black",
    backgroundColor: "#EEEEEE",
  };

  const sectionHeaderStyle: CSSProperties = {
    width: "100%",
    textAlign: "center",
    borderBottom: "1px solid black",
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>Notes</div>
        <ContentEditable
          style={editableStyle}
          tagName="pre"
          html={meeting.notesHtml} // innerHTML of the editable div
          disabled={false}
          onChange={onNotesEdit} // handle innerHTML change
        />
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>Transcript</div>
        <ContentEditable
          style={editableStyle}
          tagName="pre"
          html={meeting.transcript}
          disabled={true}
          onChange={() => {}}
        />
      </div>
    </div>
  );
};

export default Transcript;
