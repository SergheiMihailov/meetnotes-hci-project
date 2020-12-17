import { sampleMeetings } from "../../../data/sampleMeetings.json";
import { Meeting } from "../../../typings";

export const setMeetingsAction = (meetings: Meeting[]) => ({
  type: "SET_MEETINGS",
  payload: { meetings },
});

export const setCurrentMeetingIdAction = (meetingId: string) => ({
  type: "SET_CURRENT_MEETING_ID",
  payload: { meetingId },
});

export const createMeetingAction = (meeting: Meeting) => ({
  type: "CREATE_MEETING",
  payload: { meeting },
});

export const updateMeetingAction = (updatedMeeting: Meeting) => ({
  type: "UPDATE_MEETING",
  payload: { updatedMeeting },
});

export type State = {
  meetings: Meeting[];
  currentMeetingId: string;
};

const initialState: State = {
  meetings: sampleMeetings,
  currentMeetingId: sampleMeetings[0].id,
};

export default (state: State = initialState, action: any) => {
  switch (action.type) {
    case "SET_CURRENT_MEETING_ID": {
      const newState: State = { ...state };
      newState.currentMeetingId = action.payload.meetingId;
      return newState;
    }
    case "CREATE_MEETING": {
      const newState: State = { ...state };
      newState.meetings = [...newState.meetings, action.payload.meeting];
      return newState;
    }
    case "UPDATE_MEETING": {
      const newState: State = { ...state };
      newState.meetings = [
        ...newState.meetings.filter(
          (meeting) => meeting.id !== action.payload.updatedMeeting.id
        ),
        action.payload.updatedMeeting,
      ];
      return newState;
    }
    default:
      return state;
  }
};
