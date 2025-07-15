import * as EventInterface from "@/interface/event";
import DisplaySection from "@/views/home/DisplaySection";

const SectionWhatsNew = ({events}: {events: EventInterface.Event[]}) => {
  // Filter for the 3 most recent events
  const filteredEvents = events.toSorted((a,b) => b.createdDateTime - a.createdDateTime).slice(0,3);
  return (
    <DisplaySection events={filteredEvents} sectionTitle="What's New"/>
  )
};

export default SectionWhatsNew;