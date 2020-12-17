import { RootState } from "../..";

export const getMeetingsState = (state: RootState) => state.meetings;
export const getCurrentMeeting = (state: RootState) =>
  state.meetings.meetings.filter(
    (meeting) => meeting.id === state.meetings.currentMeetingId
  )[0];
export const getMeetingById = (meetingId: string) => (state: RootState) =>
  state.meetings.meetings.filter((meeting) => meeting.id === meetingId)[0];
// export const getCurrentMeeting = (state: RootState) =>
//   state.meetings.currentMeeting;
