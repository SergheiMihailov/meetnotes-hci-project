import { RootState } from "../..";

export const getMeetingInRecording = (state: RootState) =>
  state.recorder.recordingMeetingId;
