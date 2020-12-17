import { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpeechRecognition from "react-speech-recognition";
import { updateMeetingAction } from "../../redux/modules/meetings/reducers";
import { getCurrentMeeting } from "../../redux/modules/meetings/selectors";
import { getMeetingInRecording } from "../../redux/modules/recorder/selectors";

const options = {
  autoStart: false,
};

const Recorder: FunctionComponent<any> = (props: {
  transcript: string;
  resetTranscript: any;
  browserSupportsSpeechRecognition: boolean;
  listening: boolean;
  startListening: any;
  stopListening: any;
}) => {
  const meeting = useSelector(getCurrentMeeting);
  const isBeingRecorded = useSelector(getMeetingInRecording) === meeting.id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isBeingRecorded) {
      if (!props.listening) {
        props.startListening();
      }
      const timeout = setTimeout(() => {
        dispatch(
          updateMeetingAction({
            ...meeting,
            transcript: props.transcript,
          })
        );
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      if (props.listening) {
        props.stopListening();
      }
    }
  });

  return null;
};

export default SpeechRecognition(options)(Recorder);
