import { EventsArr } from "@/interface/eventsArr";

const CreateCard = ({events}: EventsArr) => {
    // Creates a div with the cards for all events in the array.
    // TODO: Add in the link to the image
    // Need to test if the tags are working properly
    return (
        <>
        {events.length > 0 && (
            events.map((event, i) => (
                <div key={i} className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md flex-1 min-w-[200px] max-w-[400px]">
                <img src="/logo.png" alt="Cyber Youth Singapore" className="w-32 h-auto mb-4" />
                <h2>{event.title}</h2>
                <div className="flex space-x-2 my-2">
                    <span className="bg-indigo-400 text-white px-4 py-1 rounded-full text-sm font-medium">
                        {event.eventType}
                    </span>
                    {event.tags.map((tag, index) => (
                        <span key={index} className="bg-indigo-400 text-white px-4 py-1 rounded-full text-sm font-medium">{tag}</span>
                    ))}
                </div>
                <p className="text-sm text-black font-semibold">{event.breifDescription}</p>
            </div>
            ))
        )}
        </>
    );
};

export default CreateCard;