import CreateCard from "@/views/home/Card";
import * as EventInterface from "@/interface/event";

const SectionHackathons = ({events, filters}: {events: EventInterface.Event[], filters: string[]}) => {
  // Filter for hackathon events
  const filteredEvents = events.filter(event => filters.every(filter => event.tags.includes(filter)));
  return (
    <section className="w-full">
      <h3 className="text-2xl font-semibold mb-4">Filtered Opportunities</h3>
      <div className="flex flex-wrap gap-6 justify-between border-2 border-black rounded-3xl p-6">
        {
            filteredEvents.length > 0 ? (
                <CreateCard events={filteredEvents} />
            ) : (
                <h2>Oops, check back later!</h2>
            )
        }
      </div>
    </section>
  );
};

export default SectionHackathons;