// [Library Imports]
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef, useContext } from "react";

// [Module Imports]
import * as EventInterface from "@/interface/event";
import { eventService } from "@/services/eventService";
import { useLoading } from "@/context/OverlayContext";
import SectionFiltered from "@/views/organisation/SectionFiltered";
import AuthContext from "@/context/AuthContext";
import * as UserInterface from "@/interface/user";
import { useNavigate } from "react-router-dom";
import { useAlertDialog } from "@/context/AlertDialogContext";

// [Globals]
interface Filter {
  name: string;
}

// [Exports]
export default function Home() {
  const [events, setEvents] = useState<EventInterface.Event[]>([]);
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();
  const { role, token } = useContext(AuthContext);
  const { showAlert } = useAlertDialog();

  const fetchEvent = async () => {
    showLoading();
    try {
      const result = await eventService.getEventsByUser(token);
      hideLoading();
      if (result && result.status) {
        setEvents(result.data);
      }
    } catch (e: any) {
      hideLoading();
      showAlert({
        title: "Failure",
        message: e.message,
        okText: 'Retry',
        onConfirm: () => {fetchEvent()},
      });
    }
  };

  useEffect(() => {
    if (token === ''){
      navigate('/login');
      return;
    }
    fetchEvent();
    return () => {
      hideLoading();
    };
  }, []);

  return (
    <div className="relative bg-[#FAF9E6] min-h-screen overflow-x-hidden">

      {/* Main Sections */}
      <h2 className="text-5xl md:text-6xl font-extrabold text-center pt-10 mb-6 bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text">
        MY EVENTS
      </h2>
      <div className="flex flex-col items-center justify-center gap-6 mb-10 max-w-full px-6">
        <SectionFiltered events={events} />
      </div>

      {/* Floating Add Button */}
      {role !== UserInterface.Role.USER && (
        <Button
          className="fixed bottom-6 right-6 z-50 rounded-full w-16 h-16 bg-gradient-to-br from-indigo-400 to-pink-500 text-white text-4xl shadow-xl hover:scale-110 hover:shadow-2xl active:scale-95 transition-all duration-300 ease-in-out"
          onClick={() => navigate("/add")}
        >
          +
        </Button>
      )}
    </div>
  );
}
