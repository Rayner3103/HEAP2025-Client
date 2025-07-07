// [Library Imports]
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

// [Module Imports]
import * as EventInterface from "@/interface/event";
import { EventsArr } from "@/interface/eventsArr";
import { eventService } from '@/services/eventService';
import ChipInput from "@/components/ChipInput";
import SectionWhatsNew from "@/views/home/SectionWhatsNew";
import SectionCompetition from "@/views/home/SectionCompetition";
import SectionHackathons from "@/views/home/SectionHackathon";

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
    title: "example1",
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
    title: "example2",
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
    <div className="bg-[#FAF9E6]">
      <h2 className="text-4xl font-bold mb-6 text-center pt-6">OPPORTUNITIES</h2>
      <div className="flex flex-col items-center justify-center gap-4 mb-8 w-screen px-10">
        <SectionWhatsNew events={events} />
        <SectionCompetition events={events} />
        <SectionHackathons events={events} />
      </div>
    </div>
  );
}