import React, { CSSProperties, FunctionComponent, useState } from "react";
import { Button, Image, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateMeetingAction } from "../../../../redux/modules/meetings/reducers";
import { getCurrentMeeting } from "../../../../redux/modules/meetings/selectors";
import RecordingControl from "../../../SideMenu/MeetingSideMenu/MeetingCard/RecordingControl";

const style: CSSProperties = {
  flex: 1,
  background: "lightgray",
  display: "flex",
  flexDirection: "row",
  maxHeight: "25vh",
  padding: 10,
  marginBottom: 10,
};

const avatarContainerStyle: CSSProperties = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
};

const infoContainerStyle: CSSProperties = {
  flex: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  backgroundColor: "#EEEEEE",
  padding: 10,
  borderRadius: 5,
};

const MeetingMetadata: FunctionComponent<any> = () => {
  const [uploadError, setUploadError] = useState(false);

  const dispatch = useDispatch();
  const meeting = useSelector(getCurrentMeeting);

  const getTranscript = () => {
    fetch("https://80.113.225.192:1827/transcripts/" + meeting.id, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((transcript) => {
        if (transcript.length > 0) {
          const updatedMeeting = {
            ...meeting,
            transcript: transcript,
            transcriptAvailable: true,
          };
          dispatch(updateMeetingAction(updatedMeeting));
        }
      })
      .catch((err) => console.log(err));
  };

  const requestGenerateTranscript = (data: any) => {
    fetch("https://80.113.225.192:1827/upload", {
      method: "POST",
      body: data,
    })
      .then((response) => {
        console.log(response);
        return response;
      })
      .then((success) => {
        console.log(success);
      })
      .catch((error) => {
        // setUploadError(true);
        console.log(error);
      });
  };

  const onFileSelected = (event: any) => {
    var data = new FormData();
    data.append("file", event.target.files[0], meeting.id);
    data.append("meetingId", meeting.id);

    const updatedMeeting = {
      ...meeting,
      audioAvailable: true,
    };
    dispatch(updateMeetingAction(updatedMeeting));
    requestGenerateTranscript(data);
  };

  const now = new Date();
  const currDate = `${now.getFullYear()}-0${
    now.getMonth() + 1
  }-${now.getDate()}`;

  return (
    <div style={style}>
      <div style={avatarContainerStyle}>
        <Image
          fluid
          thumbnail
          style={{ height: "90%" }}
          src="https://img.freepik.com/free-vector/flat-design-people-avatars-pack_52683-33824.jpg?size=338&ext=jpg"
        />
      </div>
      <div style={infoContainerStyle}>
        <div>
          <b>Participants: </b>
          {meeting.participant_ids.join(", ")}
        </div>
        <div>
          <b>Date & time: </b>
          {meeting.startTime} - {meeting.endTime}, {meeting.date}
        </div>
        <div>
          <b>Location: </b>
          {meeting.location}
        </div>
        <div>
          <b>Meeting Info: </b>
          {meeting.infoMeeting}
        </div>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          {meeting.date > currDate ? null : !meeting.audioAvailable ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              Record: <RecordingControl meetingId={meeting.id} /> or upload:
              <input type="file" name="file" onChange={onFileSelected} />
              {uploadError ? (
                <span style={{ color: "red" }}>
                  An error occured. Please retry later.
                </span>
              ) : null}
            </div>
          ) : !meeting.transcriptAvailable ? (
            <div>
              <Button variant="secondary" disabled>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Waiting for transcript... (~5 minutes wait)
              </Button>
            </div>
          ) : (
            <Button
              variant="secondary"
              href={`https://80.113.225.192:1827/uploads/${meeting.id}`}
            >
              Link to recording
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingMetadata;
