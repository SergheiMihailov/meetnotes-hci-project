export type Meeting = {
  id: string;
  title: string;
  participant_ids: string[];
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  audioAvailable: boolean;
  transcriptAvailable: boolean;
  transcript: string;
  notesHtml: string;
  summary: string;
  tasks: any[];
  agenda: any[];
  infoMeeting: string;
};

export type Profile = {
  id: string;
  firstName: string;
  lastName: string;
  avatar_url: string;
  email: string;
  about: string;
};
