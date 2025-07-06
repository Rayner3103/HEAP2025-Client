export interface Event {
  signupLink: string;
  createdUserId: string;
  title: string;
  breifDescription: string;
  eventType: EventType;
  organisation: string;
  startDate: Date;
  endDate: Date;
  mode: EventMode;
  location: string;
  signupDeadline: Date;
  origin: EventOrigin;
  additionalInformation: string;
  tags: Array<string>;
  createdDateTime: EpochTimeStamp;
}

export enum EventType {
  TALK = "Talk",
  WORKSHOP = "Workshop",
  CASE_COMPS = "Case Comps",
  HACKATHON = "Hackathons",
  OTHERS = "Others",
}

export enum EventMode {
  OFFLINE = "offline",
  ONLINE = "online",
  HYBRID = "hybrid",
  TBA = "tba",
  UNKNONWN = "unkonwn",
}

export enum EventOrigin {
  WEB = "web",
  UPLOAD = "upload",
}
