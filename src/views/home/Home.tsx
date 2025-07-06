// [Library Imports]
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

// [Module Imports]
import * as EventInterface from "@/interface/event";
import { eventService } from '@/services/eventService';
import ChipInput from "@/components/ChipInput";

// [Globals]
interface dataSchema {
  id: number;
  name: number;
  created_at: number;
}

const mockData: Array<EventInterface.Event> = [
  {
    signupLink: "www.example.com",
    createdUserId: "123",
    title: "example",
    breifDescription: "desc",
    eventType: EventInterface.EventType.OTHERS,
    organisation: "example Org",
    startDate: new Date(),
    endDate: new Date(),
    mode: EventInterface.EventMode.TBA,
    location: "here",
    signupDeadline: new Date(),
    origin: EventInterface.EventOrigin.UPLOAD,
    additionalInformation: "",
    tags: [],
    createdDateTime: 0,
  },
  {
    signupLink: "www.example.com2",
    createdUserId: "123",
    title: "example",
    breifDescription: "desc",
    eventType: EventInterface.EventType.OTHERS,
    organisation: "example Org",
    startDate: new Date(),
    endDate: new Date(),
    mode: EventInterface.EventMode.TBA,
    location: "here",
    signupDeadline: new Date(),
    origin: EventInterface.EventOrigin.UPLOAD,
    additionalInformation: "",
    tags: [],
    createdDateTime: 0,
  },
];

// [Exports]
export default function Home() {
  const [events, setEvents] = useState(mockData);

  const fetchEvent = async () => {
    try {
      const result = await eventService.getEvents();
      if (result && result.status) {
        setEvents(result.data)
      }
    } catch (e: any) {
      console.log(e)
    }

  }

  useEffect(() => {
    fetchEvent();
  }, []);

  return (
    <div>
      {
        events.length > 0 && (
          events.map((event, i) => (
            <div key={i}>
              {event.signupLink}
            </div>
          ))
        )
      }
    </div>
  );
}
