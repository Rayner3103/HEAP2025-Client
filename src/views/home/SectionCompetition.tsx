import * as EventInterface from "@/interface/event";
import DisplaySection from "@/views/home/DisplaySection";

const SectionCompetitions = ({events}: {events: EventInterface.Event[]}) => {
  // Filter for competition events
  const filteredEvents = events.filter(event => event.eventType == EventInterface.EventType.CASE_COMPS);
  return (
    <DisplaySection events={filteredEvents} sectionTitle="Competitions"/>
  )
};

export default SectionCompetitions;