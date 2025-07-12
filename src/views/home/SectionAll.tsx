import CreateCard from "@/views/home/Card";
import * as EventInterface from "@/interface/event";

const SectionAll = ({events}: {events: EventInterface.Event[]}) => {
  return (
    <section className="w-full">
      <h3 className="text-2xl font-semibold mb-4">All Events</h3>
      <div className="flex flex-wrap gap-6 border-2 border-black rounded-3xl p-6">
        {
            events.length > 0 ? (
                <CreateCard events={events} />
            ) : (
                <p>Oops, check back later!</p>
            )
        }
      </div>
    </section>
  );
};

export default SectionAll;