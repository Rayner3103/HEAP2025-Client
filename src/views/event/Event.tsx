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
    <div>
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        message={dialogMessage}
        title={dialogTitle}
      />
      <button onClick={() => {navigate("http://127.0.0.1:5000/uploads/Screenshot 2025-07-06 171508.png")}}>Click</button>
    </div>
    
    // "haha"
  )
}