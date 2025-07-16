import { Controller, useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import ChipInput from "@/components/ChipInput";
import * as EventInterface from "@/interface/event";
import { eventService } from "@/services/eventService";
import AuthContext from "@/context/AuthContext";
import { useAlertDialog } from "@/context/AlertDialogContext";
import { useLoading } from "@/context/OverlayContext";
import * as UserInterface from '@/interface/user';

type EventFormValues = {
  title: string;
  briefDescription?: string;
  description?: string;
  eventType: string;
  organisation?: string;
  startTime: string;
  endTime: string;
  mode: string;
  location?: string;
  signupDeadline?: Date;
  signupLink: string;
  tags?: string[];
  link?: string;
  additionalInformation?: string;
  image?: FileList;
};

export default function EditEventForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<EventFormValues>();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [tagObject, setTagObject] = useState({});
  const { token, role } = useContext(AuthContext);
  const { showAlert, showConfirm } = useAlertDialog();
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();
  const { eventId } = useParams();

  const startTime = watch("startTime");
  const endTime = watch("endTime");

  const onSubmit = async (data: EventFormValues) => {
    showLoading();
    const formData = new FormData();

    formData.append("origin", "upload");

    // Add primitive fields
    formData.append("title", data.title);
    formData.append("eventType", data.eventType);
    formData.append("startTime", data.startTime);
    formData.append("endTime", data.endTime);
    formData.append("mode", data.mode);
    formData.append("signupLink", data.signupLink);

    // Optional fields
    if (data.briefDescription) {
      formData.append("briefDescription", data.briefDescription);
    }
    if (data.description) {
      formData.append("description", data.description);
    }
    if (data.organisation) {
      formData.append("organisation", data.organisation);
    }
    if (data.location) {
      formData.append("location", data.location);
    }
    if (data.link) {
      formData.append("link", data.link);
    }
    if (data.additionalInformation) {
      formData.append("additionalInformation", data.additionalInformation);
    }

    // Handle signupDeadline (convert Date to ISO string)
    if (data.signupDeadline && !isNaN(data.signupDeadline.valueOf())) {
      formData.append("signupDeadline", data.signupDeadline.toISOString());
    }

    // Handle image (FileList)
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]); // only allow 1 image
    }

    if ("tags" in tagObject) {
      (tagObject.tags as string[]).forEach((tag) => {
        formData.append("tags", tag);
      });
    }

    try {
      const response = await eventService.createEvent(formData, token);
      hideLoading();
      if (response && response.status) {
        showConfirm({
          title: "Success",
          message: "Event has been updated.",
          okText: "View event",
          cancelText: "Go to home page",
          onConfirm: () => {
            navigate(`/event/${response.data}`);
          },
          onCancel: () => {
            navigate("/");
          },
        });
        return;
      }
      showAlert({
        title: "Failure",
        message: "Cannot update event",
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        alert("Only .jpg and .png files are allowed.");
        setValue("image", undefined);
        setImagePreview(null);
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB.");
        setValue("image", undefined);
        setImagePreview(null);
        return;
      }
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const fetchEvent = async (eventId: string) => {
    try {
      const response = await eventService.getEventById(eventId);
      hideLoading();
      if (response && response.status) {
        const fetchedEvent = response.data;

        // Set form values
        setValue("title", fetchedEvent.title);
        setValue("eventType", fetchedEvent.eventType);
        setValue("briefDescription", fetchedEvent.briefDescription || "");
        setValue("description", fetchedEvent.description || "");
        setValue("organisation", fetchedEvent.organisation || "");
        setValue("startTime", fetchedEvent.startTime);
        setValue("endTime", fetchedEvent.endTime);
        setValue("mode", fetchedEvent.mode);
        setValue("location", fetchedEvent.location || "");
        setValue(
          "signupDeadline",
          fetchedEvent.signupDeadline
            ? new Date(fetchedEvent.signupDeadline)
            : undefined
        );
        setValue("signupLink", fetchedEvent.signupLink);
        setValue("link", fetchedEvent.link || "");
        setValue(
          "additionalInformation",
          fetchedEvent.additionalInformation || ""
        );

        if (fetchedEvent.tags) {
          setTagObject({ tags: fetchedEvent.tags });
        }

        // Set preview image if available
        if (fetchedEvent.image) {
          if (Array.isArray(fetchedEvent.image)) {
            setImagePreview(fetchedEvent.image[0]);
          } else {
            setImagePreview(fetchedEvent.image);
          }
        }

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

  useEffect(() => {
    if (role === UserInterface.Role.USER) {
      navigate(`/event/${eventId}`)
    }
    showLoading();
    if (eventId) {
      fetchEvent(eventId);
      return;
    }
    navigate("/");
  }, [eventId]);

  return (
    <div className="bg-[#FAF9E6] min-h-screen py-10 px-6 md:px-12">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 space-y-6">
        <h1 className="text-4xl font-extrabold text-[#91ABFF] mb-6 text-center">
          Edit Event
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div className="flex flex-col">
            <Label className="text-lg font-semibold text-gray-800">
              Title *
            </Label>
            <Input
              {...register("title", { required: "Title is required" })}
              className="mt-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#91ABFF]"
              placeholder="Event title"
            />
            {errors.title && (
              <span className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* Event Type */}
          <div className="flex flex-col">
            <Label className="text-lg font-semibold text-gray-800">
              Event Type *
            </Label>
            <Select
              onValueChange={(value) => setValue("eventType", value)}
              {...register("eventType", { required: "Event type is required" })}
            >
              <SelectTrigger className="w-full mt-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#91ABFF]">
                <SelectValue placeholder="Select an event type" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(EventInterface.EventType).map(([key, type]) => (
                  <SelectItem key={key} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.eventType && (
              <span className="text-red-500 text-sm mt-1">
                {errors.eventType.message}
              </span>
            )}
          </div>

          {/* Signup Link */}
          <div className="flex flex-col">
            <Label className="text-lg font-semibold text-gray-800">
              Signup Link *
            </Label>
            <Input
              {...register("signupLink", {
                required: "Signup link is required",
                pattern: {
                  value:
                    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,
                  message: "Must be a valid URL",
                },
              })}
              className="mt-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#91ABFF]"
              placeholder="https://example.com/signup"
            />
            {errors.signupLink && (
              <span className="text-red-500 text-sm mt-1">
                {errors.signupLink.message}
              </span>
            )}
          </div>

          {/* Mode */}
          <div className="flex flex-col">
            <Label className="text-lg font-semibold text-gray-800">
              Mode *
            </Label>
            <Select
              onValueChange={(value) => setValue("mode", value)}
              {...register("mode", { required: "Mode is required" })}
            >
              <SelectTrigger className="w-full mt-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#91ABFF]">
                <SelectValue placeholder="Select a mode" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(EventInterface.EventMode).map(([key, mode]) => (
                  <SelectItem key={mode} value={mode}>
                    {mode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.mode && (
              <span className="text-red-500 text-sm mt-1">
                {errors.mode.message}
              </span>
            )}
          </div>

          {/* Brief Description */}
          <div className="flex flex-col">
            <Label className="text-lg font-semibold text-gray-800">
              Brief Description
            </Label>
            <Input
              {...register("briefDescription")}
              className="mt-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#91ABFF]"
              placeholder="Short description"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <Label className="text-lg font-semibold text-gray-800">
              Description
            </Label>
            <Textarea
              {...register("description")}
              className="mt-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#91ABFF]"
              rows={4}
              placeholder="Detailed event description"
            />
          </div>

          {/* Organiser */}
          <div className="flex flex-col">
            <Label className="text-lg font-semibold text-gray-800">
              Organiser(s)
            </Label>
            <Input
              {...register("organisation")}
              className="mt-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#91ABFF]"
              placeholder="Organisation name(s)"
            />
          </div>

          {/* Start Time & End Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Label className="text-lg font-semibold text-gray-800">
                Start Time
              </Label>
              <Input
                type="time"
                {...register("startTime")}
                className="mt-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#91ABFF]"
              />
              {errors.startTime && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.startTime.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <Label className="text-lg font-semibold text-gray-800">
                End Time
              </Label>
              <Input
                type="time"
                {...register("endTime", {
                  validate: (value) =>
                    !value ||
                    (!startTime && "Start time should be specified") ||
                    value > startTime ||
                    "End time must be after start time",
                })}
                className="mt-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#91ABFF]"
              />
              {errors.endTime && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.endTime.message}
                </span>
              )}
            </div>
          </div>

          {/* Location & Signup Deadline */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Label className="text-lg font-semibold text-gray-800">
                Location
              </Label>
              <Input
                {...register("location")}
                className="mt-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#91ABFF]"
                placeholder="Event location"
              />
            </div>
            <div className="flex flex-col">
              <Label className="text-lg font-semibold text-gray-800">
                Signup Deadline
              </Label>
              <Input
                type="date"
                {...register("signupDeadline", { valueAsDate: true })}
                className="mt-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#91ABFF]"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <Label className="text-lg font-semibold text-gray-800">Tags</Label>
            <ChipInput
              field="tags"
              initialList={
                "tags" in tagObject ? (tagObject.tags as string[]) : []
              }
              setStateFunction={setTagObject}
            />
          </div>

          {/* Additional Information */}
          <div className="flex flex-col">
            <Label className="text-lg font-semibold text-gray-800">
              Additional Information
            </Label>
            <Textarea
              {...register("additionalInformation")}
              className="mt-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#91ABFF]"
              rows={3}
              placeholder="Extra info about the event"
            />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col">
            <Label className="text-lg font-semibold text-gray-800">
              Event Image (Max 2MB, JPG/PNG)
            </Label>
            <Input
              type="file"
              accept=".jpg,.png"
              {...register("image")}
              onChange={handleImageChange}
              className="mt-2"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-3 h-32 object-contain rounded-lg border border-gray-300 shadow-sm"
              />
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold py-3 rounded-full text-lg hover:from-pink-500 hover:to-indigo-500 shadow-lg transition"
          >
            Update Event
          </Button>
        </form>
      </div>
    </div>
  );
}
