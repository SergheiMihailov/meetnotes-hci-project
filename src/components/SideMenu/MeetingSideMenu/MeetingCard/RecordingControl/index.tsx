import React, { CSSProperties, FunctionComponent } from "react";
import { Button } from "react-bootstrap";
import { FaMicrophone, FaPause, FaStop } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  startRecordingAction,
  stopRecordingAction,
} from "../../../../../redux/modules/recorder/reducers";
import { getMeetingInRecording } from "../../../../../redux/modules/recorder/selectors";
import { Meeting } from "../../../../../typings";
import { updateMeetingAction } from "../../../../../redux/modules/meetings/reducers";
import { getMeetingById } from "../../../../../redux/modules/meetings/selectors";

const recordControlStyle: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
};

const recordButtonStyle: CSSProperties = {
  flex: 1,
  backgroundColor: "red",
  color: "white",
  //   width: 60,
  height: "100%",
  //   marginLeft: 10,
  fontSize: 16,
  textAlign: "center",
};

const stopButtonStyle: CSSProperties = {
  flex: 1,
  backgroundColor: "white",
  color: "black",
  // width: 60,
  // height: 60,
  marginLeft: 10,
  fontSize: 16,
  textAlign: "center",
};

const pauseButtonStyle: CSSProperties = stopButtonStyle;

const RecordingControl: FunctionComponent<any> = (props: {
  meetingId: string;
}) => {
  const isBeingRecorded =
    useSelector(getMeetingInRecording) === props.meetingId;
  const meeting = useSelector(getMeetingById(props.meetingId));

  const dispatch = useDispatch();

  const onRecord = () => {
    dispatch(startRecordingAction(meeting));
  };

  const onPauseRecording = () => {
    dispatch(stopRecordingAction());
  };

  const onStopRecording = () => {
    onPauseRecording();
    dispatch(
      updateMeetingAction({
        ...meeting,
        audioAvailable: true,
        transcriptAvailable: true,
      })
    );
  };

  return (
    <div>
      {meeting?.transcriptAvailable &&
      meeting?.audioAvailable ? null : isBeingRecorded ? (
        <div style={recordControlStyle}>
          <Button style={pauseButtonStyle} onClick={onPauseRecording}>
            <FaPause />
          </Button>
          <Button style={stopButtonStyle} onClick={onStopRecording}>
            <FaStop />
          </Button>
        </div>
      ) : (
        <div style={recordControlStyle}>
          <Button style={recordButtonStyle} onClick={onRecord}>
            <FaMicrophone />
            Record
          </Button>
        </div>
      )}
    </div>
  );
};
export default RecordingControl;
