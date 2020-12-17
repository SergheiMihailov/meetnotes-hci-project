import { Meeting } from "../../../typings";

export const startRecordingAction = (meeting: Meeting) => ({
  type: "START_RECORDING",
  payload: { meeting },
});

export const stopRecordingAction = () => ({
  type: "STOP_RECORDING",
  payload: {},
});

export type State = {
  isRecording: boolean;
  recordingMeetingId: string;
  startTime: number;
  stopTime: number;
};

const initialState: State = {
  isRecording: false,
  recordingMeetingId: "-1",
  startTime: -1,
  stopTime: -1,
};

export default (state: State = initialState, action: any) => {
  switch (action.type) {
    case "START_RECORDING": {
      const newState: State = { ...state };
      newState.isRecording = true;

      const now = new Date();

      newState.startTime = now.getTime();

      newState.recordingMeetingId = action.payload.meeting.id;

      return newState;
    }
    case "STOP_RECORDING": {
      return initialState;
    }
    default:
      return state;
  }
};
