import { useSearch } from "@/context/SearchContext";
import * as EventInterface from "@/interface/event";
import DisplaySection from "@/views/organisation/DisplaySection";

const SectionHackathons = ({
  events,
}: {
  events: EventInterface.Event[];
}) => {
  const { search } = useSearch();

  // Filter for hackathon events
  const filteredEvents = events
    .filter((event) =>
      event.title.toLowerCase().includes(search.toLowerCase())
    );
  return (
    <DisplaySection
      events={filteredEvents}
      sectionTitle="Events"
    />
  );
};

export default SectionHackathons;
