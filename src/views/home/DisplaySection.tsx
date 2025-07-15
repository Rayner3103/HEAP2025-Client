import CreateCard from "@/views/home/Card";
import * as EventInterface from "@/interface/event";

const DisplaySection = ({events, sectionTitle}: {events: EventInterface.Event[], sectionTitle: string}) => {
  return (
    <section className="w-full">
      <h3 className="text-2xl font-semibold mb-4">{sectionTitle}</h3>
      <div className="flex flex-wrap gap-6 justify-evenly border-2 border-black rounded-3xl px-9 py-6">
        {
            events.length > 0 ? (
                <CreateCard events={events} />
            ) : (
                <h2>Oops, check back later!</h2>
            )
        }
      </div>
    </section>
  );
};

export default DisplaySection;