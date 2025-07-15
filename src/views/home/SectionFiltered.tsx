import * as EventInterface from "@/interface/event";
import DisplaySection from "@/views/home/DisplaySection";

const SectionHackathons = ({events, filters}: {events: EventInterface.Event[], filters: string[]}) => {
  // Filter for hackathon events
  const filteredEvents = events.filter(event => filters.every(filter => event.tags.includes(filter)));
  return (
    <DisplaySection events={filteredEvents} sectionTitle="Filtered Opportunities"/>
  )
};

export default SectionHackathons;