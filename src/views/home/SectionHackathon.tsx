import * as EventInterface from "@/interface/event";
import DisplaySection from "@/views/home/DisplaySection";

const SectionHackathons = ({events}: {events: EventInterface.Event[]}) => {
  // Filter for hackathon events
  const filteredEvents = events.filter(event => event.eventType == EventInterface.EventType.HACKATHON);
  return (
    <DisplaySection events={filteredEvents} sectionTitle="Hackathons"/>
  )
};

export default SectionHackathons;