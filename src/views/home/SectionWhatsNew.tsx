import CreateCard from "@/views/home/Card";
import * as EventInterface from "@/interface/event";

const SectionWhatsNew = ({events}: {events: EventInterface.Event[]}) => {
  // Filter for the 3 most recent events
  const filteredEvents = events.toSorted((a,b) => b.createdDateTime - a.createdDateTime).slice(0,3);
  return (
    <section className="w-full">
      <h3 className="text-2xl font-semibold mb-4">What’s New</h3>
      <div className="flex flex-wrap gap-6 border-2 border-black rounded-3xl p-6">
        {
            events.length > 0 ? (
                <CreateCard events={filteredEvents} />
            ) : (
                <p>Oops, check back later!</p>
            )
        }
      </div>
    </section>
  );
};

export default SectionWhatsNew;