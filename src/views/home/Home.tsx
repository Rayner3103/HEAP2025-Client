// [Library Imports]
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

// [Module Imports]
import * as EventInterface from "@/interface/event";
import { eventService } from "@/services/eventService";
import SectionWhatsNew from "@/views/home/SectionWhatsNew";
import SectionCompetition from "@/views/home/SectionCompetition";
import SectionHackathons from "@/views/home/SectionHackathon";
import { useLoading } from '@/context/OverlayContext';

// [Globals]
interface dataSchema {
  id: number;
  name: number;
  created_at: number;
}

// [Exports]
export default function Home() {
  const [events, setEvents] = useState([]);
  const { showLoading, hideLoading } = useLoading();

  const fetchEvent = async () => {
    try {
      const result = await eventService.getEvents();
      if (result && result.status) {
        setEvents(result.data);
        hideLoading();
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect(() => {
    showLoading();
    fetchEvent();
  }, []);

  return (
    <div className="bg-[#FAF9E6]">
      <h2 className="text-4xl font-bold mb-6 text-center pt-6">
        OPPORTUNITIES
      </h2>
      <div className="flex flex-col items-center justify-center gap-4 mb-8 w-screen px-10">
        <SectionWhatsNew events={events} />
        <SectionCompetition events={events} />
        <SectionHackathons events={events} />
      </div>
    </div>
  );
}
