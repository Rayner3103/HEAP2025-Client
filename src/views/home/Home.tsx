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
    <><div>
      {events.length > 0 && (
        events.map((event, i) => (
          <div key={i}>
            {event.signupLink}
          </div>
        ))
      )}
    </div><div className="bg-[#FAF9E6]">
        <h2 className="text-4xl font-bold mb-6 text-center pt-6">OPPORTUNITIES</h2>
        <div className="flex flex-col items-center justify-center gap-4 mb-8">
          <WhatsNewSection />
          <CompetitionsSection />
          <HackathonsSection />
        </div>
      </div></>
  );
}

const EventCard = () => {
    // TODO: Replace with actual data fetching logic
  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md flex-1 min-w-[200px] max-w-[400px]">
      <img src="/logo.png" alt="Cyber Youth Singapore" className="w-32 h-auto mb-4" />
      <div className="flex space-x-2 my-2">
        <span className="bg-indigo-400 text-white px-4 py-1 rounded-full text-sm font-medium">
          OPPORTUNITY TYPE
        </span>
        <span className="bg-indigo-400 text-white px-4 py-1 rounded-full text-sm font-medium">
          THEME
        </span>
      </div>
      <p className="text-sm text-black font-semibold">DETAILS ON EVENT</p>
    </div>
  );
};

const WhatsNewSection = () => {
    // TODO: Replace with dynamically fetched data
  return (
    <section className="">
      <h3 className="text-2xl font-semibold mb-4">What’s New</h3>
      <div className="flex flex-wrap gap-6 justify-between border-2 border-black rounded-3xl p-6">
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </section>
  );
};

const CompetitionsSection = () => {
    // TODO: Replace with dynamically fetched data
  return (
    <section className="">
      <h3 className="text-2xl font-semibold mb-4">Competitions</h3>
      <div className="flex flex-wrap gap-6 justify-between border-2 border-black rounded-3xl p-6">
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </section>
  );
};

const HackathonsSection = () => {
    // TODO: Replace with dynamically fetched data
  return (
    <section className="">
      <h3 className="text-2xl font-semibold mb-4">Hackathons</h3>
      <div className="flex flex-wrap gap-6 justify-between border-2 border-black rounded-3xl p-6">
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </section>
  );
};
