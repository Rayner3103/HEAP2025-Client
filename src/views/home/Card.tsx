import { Event } from "@/interface/event";
import * as ReactRouter from "react-router-dom";

const CreateCard = ({ events }: { events: Event[] }) => {
  const navigate = ReactRouter.useNavigate();

  return (
    <>
      {events &&
        events.map((event, i) => (
          <div
            key={i}
            className="flex flex-col items-center bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-md min-h-[24rem] w-96 m-2 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            onClick={() => navigate(`/event/${event.eventId}`)}
          >
            {/* Image */}
            <div className="flex w-full justify-center overflow-hidden rounded-xl mb-4 h-48">
              {event.image ? (
                <img
                  src={event.image}
                  alt={event.organisation}
                  className="h-full w-full object-cover rounded-xl transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <div className="w-full h-full rounded-xl" />
              )}
            </div>

            {/* Title */}
            <h2 className="text-xl font-extrabold text-gray-800 text-center mb-2">
              {event.title}
            </h2>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 justify-center max-h-20 overflow-y-auto mb-2">
              {/* Event Type */}
              <span className="bg-gradient-to-r from-blue-500 to-green-400 text-white px-4 py-1 rounded-full text-base font-semibold drop-shadow-sm shadow hover:scale-105 transition">
                {event.eventType}
              </span>

              {/* Other Tags */}
              {event.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-4 py-1 rounded-full text-base font-semibold drop-shadow-sm shadow-sm hover:scale-105 transition"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-sm text-gray-700 font-medium text-center line-clamp-3">
              {event.briefDescription}
            </p>
          </div>
        ))}
    </>
  );
};

export default CreateCard;
