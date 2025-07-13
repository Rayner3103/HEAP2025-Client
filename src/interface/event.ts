export interface Event {
  eventId: string;
  signupLink: string;
  createdUserId: string;
  title: string;
  briefDescription: string;
  description: string;
  eventType: EventType;
  organisation: string;
  startTime: string;
  endTime: string;
  mode: EventMode;
  image: string;
  location: string;
  signupDeadline: Date;
  origin: EventOrigin;
  additionalInformation: string;
  tags: Array<string>;
  createdDateTime: EpochTimeStamp;
}

export interface _Event {
  eventId?: string;
  signupLink?: string;
  createdUserId?: string;
  title?: string;
  briefDescription?: string;
  description?: string;
  eventType?: EventType;
  organisation?: string;
  startTime?: string;
  endTime?: string;
  mode?: EventMode;
  image?: File;
  location?: string;
  signupDeadline?: Date;
  origin?: EventOrigin;
  additionalInformation?: string;
  tags?: Array<string>;
  createdDateTime?: EpochTimeStamp;
}

export enum EventType {
  TALK = "Talks",
  WORKSHOP = "Workshops",
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
