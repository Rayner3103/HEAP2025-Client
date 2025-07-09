import { Event } from "@/interface/event";

const CreateCard = ({ events }: { events: Event[]}) => {
  return (
    <>
      {events &&
        events.map((event, i) => (
          <div
            key={i}
            className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md min-w-[200px] max-w-[400px] h-72 w-96"
            onClick={() => {}}
          >
            <div
              className="flex w-full justify-center"
            >
                <img
                src={event.image}
                alt={event.organisation}
                className="w-32 h-auto mb-4"
                />
            </div>
            <div
              className="flex items-center flex-col w-full mt-auto"
            >
                <h2><b>{event.title}</b></h2>
                <div className="flex flex-wrap gap-2 my-2 justify-center">
                <span className="bg-indigo-400 text-white px-4 py-1 rounded-full text-sm font-medium">
                    {event.eventType}
                </span>
                {event.tags && event.tags.map((tag, index) => (
                    <span
                    key={index}
                    className="bg-indigo-400 text-white px-4 py-1 rounded-full text-sm font-medium"
                    >
                    {tag}
                    </span>
                ))}
                </div>
                <p className="text-sm text-black font-semibold">
                {event.briefDescription}
                </p>
            </div>
          </div>
        ))}
    </>
  );
};

export default CreateCard;
