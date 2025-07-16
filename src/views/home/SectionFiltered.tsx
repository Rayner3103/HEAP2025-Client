import { useSearch } from "@/context/SearchContext";
import * as EventInterface from "@/interface/event";
import DisplaySection from "@/views/home/DisplaySection";

const SectionHackathons = ({
  events,
  filters,
}: {
  events: EventInterface.Event[];
  filters: string[];
}) => {
  const { search } = useSearch();

  // Filter for hackathon events
  const filteredEvents = events
    .filter((event) => filters.every((filter) => event.tags.includes(filter)))
    .filter((event) =>
      event.title.toLowerCase().includes(search.toLowerCase())
    );
  return (
    <DisplaySection
      events={filteredEvents}
      sectionTitle="Filtered Opportunities"
    />
  );
};

export default SectionHackathons;
