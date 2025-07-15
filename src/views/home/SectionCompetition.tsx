import CreateCard from "@/views/home/Card";
import * as EventInterface from "@/interface/event";

const SectionCompetitions = ({events}: {events: EventInterface.Event[]}) => {
  // Filter for competition events
  const filteredEvents = events.filter(event => event.eventType == EventInterface.EventType.CASE_COMPS);
  return (
    <section className="w-full">
      <h3 className="text-2xl font-semibold mb-4">Competitions</h3>
      <div className="flex flex-wrap gap-6 justify-between border-2 border-black rounded-3xl px-9 py-6">
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

export default SectionCompetitions;