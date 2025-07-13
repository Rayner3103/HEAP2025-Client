// TODO: make it easier to remove the image
// [Library Imports]
import { Button } from "@/components/ui/button";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ChipInput from "@/components/ChipInput";

// [Module Imports]
import AuthContext from "@/context/AuthContext";
import { useAlertDialog } from "@/context/AlertDialogContext";
import { useLoading } from "@/context/OverlayContext";
import * as EventInterface from "@/interface/event";
import { eventService } from "@/services/eventService";
import { Calendar } from "@/components/ui/calendar";

// [Globals]
const textFields = [
  "title",
  "briefDescription",
  "description",
  "organisers",
  "venue",
  "signupLink",
  "link",
  "additionalInformation",
];

const dateFields = ["signupDeadline"];

const selectFields = [
  { key: "eventType", options: EventInterface.EventType },
  { key: "mode", options: EventInterface.EventMode },
];

const requiredFields = ["title", "eventType", "mode", "signupLink"];

// [Exports]
export default function EventForm() {
  const { userId, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { showAlert } = useAlertDialog();
  const { showLoading, hideLoading } = useLoading();

  const [newEvent, setNewEvent] = useState<EventInterface._Event>({});

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    setNewEvent((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleDateChange = (date: Date | undefined, key: string) => {
    if (!date) {
      return;
    }
    setNewEvent((prev) => ({
      ...prev,
      [key]: date,
    }));
  };

  const handleTextareaChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    key: string
  ) => {
    setNewEvent((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleEnumChange = (key: string, value: string) => {
    setNewEvent((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log(newEvent);
    // Validation
    const missingFields = requiredFields.filter(
      (field) => !newEvent[field as keyof EventInterface._Event]
    );

    if (missingFields.length > 0) {
      showAlert({
        title: "Missing Fields",
        message: `Please fill in: ${missingFields.join(", ")}`,
        onConfirm: () => {},
      });
      return;
    }

    showLoading();
    try {
      const res = await eventService.createEvent(newEvent, token);
      // const res = undefined;
      hideLoading();

      if (res && res.status) {
        showAlert({
          title: "Success",
          message: "Event created successfully!",
          onConfirm: () => navigate("/events"),
        });
        return;
      }

      showAlert({
        title: "Failure",
        message: "Failed to create event. Please try again later.",
        onConfirm: () => {},
      });
    } catch (e: any) {
      hideLoading();
      showAlert({
        title: "Error",
        message: e.message,
        onConfirm: () => {},
      });
    }
  };

  useEffect(() => {
    if (!userId || !token) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="bg-[#FAF9E6] min-h-screen p-8">
      <form className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold mb-4">Create New Event</h1>

        {/* Text fields */}
        {textFields.map((key, i) => (
          <div className="flex flex-col" key={i}>
            <Label className="mb-1 capitalize text-sm font-medium text-gray-800">
              {key.replace(/([A-Z])/g, " $1").toLowerCase()}:
            </Label>
            {key === "briefDescription" || key === "description" ? (
              <Textarea
                value={
                  (newEvent[key as keyof EventInterface._Event] as string) ?? ""
                }
                onChange={(e) => handleTextareaChange(e, key)}
                className="rounded-md border border-gray-300 px-4 py-2"
              />
            ) : (
              <Input
                value={
                  (newEvent[key as keyof EventInterface._Event] as string) ?? ""
                }
                onChange={(e) => handleFieldChange(e, key)}
                className="rounded-md border border-gray-300 px-4 py-2"
              />
            )}
          </div>
        ))}

        {/* Start Time */}
        <div className="flex flex-col">
          <Label className="mb-1 capitalize text-sm font-medium text-gray-800">
            Start Time:
          </Label>
          <Input
            type="time"
            value={newEvent.startTime ?? ""}
            onChange={(e) =>
              setNewEvent((prev) => ({
                ...prev,
                startTime: e.target.value, // format: "HH:mm"
              }))
            }
            className="rounded-md border border-gray-300 px-4 py-2"
          />
        </div>

        {/* End Time */}
        <div className="flex flex-col">
          <Label className="mb-1 capitalize text-sm font-medium text-gray-800">
            End Time:
          </Label>
          <Input
            type="time"
            value={newEvent.endTime ?? ""}
            onChange={(e) =>
              setNewEvent((prev) => ({
                ...prev,
                endTime: e.target.value, // format: "HH:mm"
              }))
            }
            className="rounded-md border border-gray-300 px-4 py-2"
            disabled={!newEvent.startTime} // Disable if startTime is empty
          />
        </div>

        {/* Date fields */}
        {dateFields.map((key, i) => (
          <div className="flex flex-col" key={i}>
            <Label className="mb-1 capitalize text-sm font-medium text-gray-800">
              {key.replace(/([A-Z])/g, " $1").toLowerCase()}:
            </Label>
            <Calendar
              mode="single"
              selected={newEvent[key as keyof EventInterface._Event] as Date}
              onSelect={(date) => handleDateChange(date, key)}
              className="rounded-md border border-gray-300 px-4 py-2"
            />
          </div>
        ))}

        {/* Enum fields */}
        {selectFields.map(({ key, options }) => (
          <div className="flex flex-col" key={key}>
            <Label className="mb-1 capitalize text-sm font-medium text-gray-800">
              {key.replace(/([A-Z])/g, " $1").toLowerCase()}:
            </Label>
            <Select
              value={
                (newEvent[key as keyof EventInterface._Event] as string) ?? ""
              }
              onValueChange={(value) => handleEnumChange(key, value)}
            >
              <SelectTrigger className="w-full rounded-md border border-gray-300 px-4 py-2">
                <SelectValue placeholder={`Select ${key}`} />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(options).map(([key, value]) => (
                  <SelectItem value={value} key={value}>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}

        {/* Tags */}
        <div className="flex flex-col">
          <Label className="mb-1 text-sm font-medium text-gray-800">
            Tags:
          </Label>
          <ChipInput
            setStateFunction={setNewEvent}
            field="tags"
            initialList={[]}
          />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col">
          <Label className="mb-1 capitalize text-sm font-medium text-gray-800">
            Event Image:
          </Label>
          <Input
            type="file"
            accept=".jpg,.jpeg,.png" // restrict file types
            onChange={(e) => {
              const file = e.target.files?.[0]; // only take first file
              if (file) {
                const maxSize = 2 * 1024 * 1024; // 2MB in bytes
                const allowedTypes = ["image/jpeg", "image/png"];

                // Validate file type
                if (!allowedTypes.includes(file.type)) {
                  showAlert({
                    title: "Invalid File Type",
                    message: "Only .jpg and .png images are allowed.",
                    onConfirm: () => {},
                  });
                  return;
                }

                // Validate file size
                if (file.size > maxSize) {
                  showAlert({
                    title: "File Too Large",
                    message: "Image size must be under 2MB.",
                    onConfirm: () => {},
                  });
                  return;
                }

                // All validations passed
                setNewEvent((prev) => ({
                  ...prev,
                  image: file, // store the File object
                }));
              }
            }}
            className="rounded-md border border-gray-300 px-4 py-2"
          />

          {/* Image Preview */}
          {newEvent.image && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(newEvent.image)}
                alt="Event preview"
                className="w-40 h-40 object-cover rounded-md border"
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-black text-white px-6 py-2 rounded-md"
          >
            Create Event
          </Button>
          <Button
            type="button"
            onClick={() => navigate("/events")}
            className="bg-gray-500 text-white px-6 py-2 rounded-md"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
