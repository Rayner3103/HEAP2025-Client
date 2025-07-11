// TODO: general dialog context & component + event page
import * as ReactRouter from 'react-router-dom';
import * as React from 'react';

import { eventService } from '@/services/eventService';
import * as EventInterface from '@/interface/event';
import { useLoading } from '@/context/OverlayContext';
import AlertDialog from "@/components/AlertDialog";

export default function Event () {
  const { eventId } = ReactRouter.useParams();
  const navigate = ReactRouter.useNavigate();
  const { showLoading, hideLoading } = useLoading();

  const [open, setOpen] = React.useState(false);
  const [dialogMessage, setDialogMessage] = React.useState("");
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [event, setEvent] = React.useState<EventInterface.Event | null>(null);

  const fetchEvent = async (eventId: string) => {
    try {
      const response = await eventService.getEventById(eventId);
      hideLoading();
      if (response && response.status) {
        setEvent(response.data);
        return;
      }
      setDialogMessage("Cannot load event")
      setDialogTitle("Error");
      setOpen(true);
    } catch (e: any) {
      hideLoading();
      setDialogMessage(e.message);
      setDialogTitle("Error");
      setOpen(true);
    } 
  }

  React.useEffect(() => {
    showLoading();
    if (eventId) {
      fetchEvent(eventId);
      return;
      // fetch data & check if id valid
    }
    navigate('/');
  }, [eventId])

  return (
    <div className='mx-4'>
      {/* Title and Tag */}
      <h1 className="text-3xl font-semibold mb-2">{event?.title}</h1>
      <div className="flex flex-wrap gap-2 my-2">
        <span className="bg-indigo-400 text-white px-4 py-1 rounded-full text-sm font-medium">
          {event?.eventType}
        </span>
        {event?.tags &&
          event?.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-indigo-400 text-white px-4 py-1 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Content */}
        <div className="md:col-span-2 space-y-6">
          {/* About */}
          <div>
            <h2 className="text-xl font-bold mb-2">About</h2>
            {event?.image !== "" && (
                <img
                  src={event?.image}
                  alt={event?.organisation}
                  className="w-32 h-auto mb-4"
                />
              )}
          </div>

          {/* Organised By */}
          <div>
            <h3 className="font-bold mb-2">Organised By:</h3>
            <span className="bg-gray-400 text-white px-4 py-1 rounded-full text-sm font-medium">
              {event?.eventType}
            </span>
            <div className="space-y-1 py-4">
              <p className="text-sm">{event?.description}</p>
            </div>
          </div>

          {/* For Queries */}
          <div>
            <h3 className="font-bold mt-6">For Queries:</h3>
            <p className="text-sm">{event?.additionalInformation}</p>
          </div>
        </div>

        {/* Right Panel */}
        <div>
          <h2 className="text-lg font-bold mb-2">Details:</h2>
          <div className="bg-gray-400 p-6 rounded-3xl space-y-4">
            <p className="font-semibold">Event Mode: {event?.mode}</p>
            <p className="font-semibold">Event Location: {event?.location ?? "unknown"}</p>
            <p className="font-semibold">Signup Deadline: {event?.signupDeadline?.toLocaleString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>

            <div className="pt-8">
              <ReactRouter.Link to={event?.signupLink ?? "/"} target='_blank'>
              <button className="w-full bg-white text-black font-bold py-3 rounded-full text-lg hover:bg-gray-100">
                Register Here
              </button>
              </ReactRouter.Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}