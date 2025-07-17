import * as ReactRouter from "react-router-dom";
import * as React from "react";
import { motion } from "framer-motion";
import { Pencil } from "lucide-react";

import { eventService } from "@/services/eventService";
import * as EventInterface from "@/interface/event";
import * as UserInterface from "@/interface/user";
import { useLoading } from "@/context/OverlayContext";
import { useAlertDialog } from "@/context/AlertDialogContext";

import AuthContext from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const UPLOAD_URL = import.meta.env.VITE_SERVER_ASSET_PATH;

export default function Event() {
  const { eventId } = ReactRouter.useParams();
  const navigate = ReactRouter.useNavigate();
  const { role, userId } = React.useContext(AuthContext);
  const { showLoading, hideLoading } = useLoading();
  const { showAlert } = useAlertDialog();

  const [event, setEvent] = React.useState<EventInterface.Event | null>(null);

  const fetchEvent = async (eventId: string) => {
    try {
      const response = await eventService.getEventById(eventId);
      hideLoading();
      if (response && response.status) {
        setEvent(response.data);
        return;
      }
      showAlert({
        title: "Failure",
        message: "Cannot load event",
        onConfirm: () => {},
      });
    } catch (e: any) {
      hideLoading();
      showAlert({
        title: "Failure",
        message: e.message,
        onConfirm: () => {},
      });
    }
  };

  React.useEffect(() => {
    showLoading();
    if (eventId) {
      fetchEvent(eventId);
      return;
    }
    navigate("/");
  }, [eventId]);

  return (
    <div className="mx-4">
      {/* Title and Tags */}
      <motion.h1
        className="text-5xl font-extrabold mt-4 mb-4 bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {event?.title}
      </motion.h1>

      <div className="flex flex-wrap gap-2 my-3">
        <span className="bg-gradient-to-r from-blue-500 to-green-400 text-white px-4 py-1 rounded-full text-sm font-semibold shadow transition">
          {event?.eventType}
        </span>
        {event?.tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow transition"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 items-start">
        {/* Left Content */}
        <motion.div
          className="md:col-span-2 space-y-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* About */}
          <div>
            <h2 className="text-2xl font-bold mb-3 text-gray-800">About</h2>
            {event?.image && (
              <img
                src={Array.isArray(event.image) ? `${UPLOAD_URL}/${event.image[0]}` : event.image}
                alt={event.organisation}
                className="w-full rounded-2xl shadow-lg transition"
              />
            )}
          </div>

          {/* Organised By */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              Organised By: {event?.organisation}
            </h3>
            <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-medium">
              {event?.eventType}
            </span>
            <p className="text-gray-600 text-base mt-3 leading-relaxed process-newline">
              {event?.description}
            </p>
          </div>

          {/* Additional Information */}
          {event?.additionalInformation && (
            <div>
              <h3 className="text-lg font-semibold mt-5 text-gray-700">
                Additional Information:
              </h3>
              <p className="text-gray-600 text-base leading-relaxed process-newline">
                {event.additionalInformation}
              </p>
            </div>
          )}
        </motion.div>

        {/* Right Panel */}
        <motion.div
          className="sticky top-24 bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-xl space-y-5 h-auto"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-3">Details:</h2>
          <p className="font-medium text-gray-700">
            Event Mode: <span className="capitalize">{event?.mode}</span>
          </p>
          <p className="font-medium text-gray-700">
            Location: <span>{event?.location ?? "Unknown"}</span>
          </p>
          <p className="font-medium text-gray-700">
            Signup Deadline:{" "}
            <span className="font-semibold text-red-500">
              {event?.signupDeadline?.toLocaleString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
          </p>

          {event?.origin === EventInterface.EventOrigin.WEB && (
            <p className="font-medium text-gray-700">
              Details of this event is obtained by a bot at {event.createdDateTime.toString()}.
            </p>
          )}

          <div className="pt-4">
            <ReactRouter.Link to={event?.signupLink ?? "/"} target="_blank">
              <button className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold py-3 rounded-full text-lg hover:from-pink-500 hover:to-indigo-500 shadow-lg transition">
                Register Here
              </button>
            </ReactRouter.Link>
          </div>
        </motion.div>
      </div>

      {/* Floating Add Button */}
      {(role === UserInterface.Role.ADMIN ||
        (role === UserInterface.Role.ORGANISER &&
          userId === event?.createdUserId)) && (
        <Button
          className="fixed bottom-6 right-6 z-50 rounded-full w-16 h-16 bg-gradient-to-br from-indigo-400 to-pink-500 text-white text-4xl shadow-xl hover:scale-110 hover:shadow-2xl active:scale-95 transition-all duration-300 ease-in-out"
          onClick={() => navigate(`/edit/${eventId}`)}
        >
          <Pencil className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
