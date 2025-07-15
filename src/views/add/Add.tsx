import { Controller, useForm } from "react-hook-form";
import { useContext, useState } from "react";

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
import { useNavigate } from "react-router-dom";

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

export default function AddEventForm() {
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
  const { token } = useContext(AuthContext);
  const { showAlert, showConfirm } = useAlertDialog();
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();

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
          message: "Event has been created.",
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
        message: "Cannot create event",
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

  return (
    <div className="bg-[#FAF9E6] min-h-screen p-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto space-y-4"
      >
        {/* Title */}
        <div className="flex flex-col">
          <Label>Title *</Label>
          <Input {...register("title", { required: "Title is required" })} />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>

        {/* Event Type */}
        <div className="flex flex-col">
          <Label>Event Type *</Label>
          <Select
            onValueChange={(value) => setValue("eventType", value)}
            {...register("eventType", { required: "Event type is required" })}
          >
            <SelectTrigger className="w-full">
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
            <span className="text-red-500 text-sm">
              {errors.eventType.message}
            </span>
          )}
        </div>

        {/* Signup Link */}
        <div className="flex flex-col">
          <Label>Signup Link *</Label>
          <Input
            {...register("signupLink", {
              required: "Signup link is required",
              pattern: {
                value:
                  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                message: "Must be a valid URL",
              },
            })}
          />
          {errors.signupLink && (
            <span className="text-red-500 text-sm">
              {errors.signupLink.message}
            </span>
          )}
        </div>

        {/* Mode */}
        <div className="flex flex-col">
          <Label>Mode *</Label>
          <Select
            onValueChange={(value) => setValue("mode", value)}
            {...register("mode", { required: "Mode is required" })}
          >
            <SelectTrigger className="w-full">
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
            <span className="text-red-500 text-sm">{errors.mode.message}</span>
          )}
        </div>

        {/* Brief Description */}
        <div className="flex flex-col">
          <Label>Brief Description</Label>
          <Input {...register("briefDescription")} />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <Label>Description</Label>
          <Textarea
            {...register("description")}
            className="border rounded-md p-2"
            rows={3}
          />
        </div>

        {/* organisation */}
        <div className="flex flex-col">
          <Label>Organiser(s)</Label>
          <Input {...register("organisation")} />
        </div>

        {/* Start Time */}
        <div className="flex flex-col">
          <Label>Start Time</Label>
          <Input type="time" {...register("startTime")} />
          {errors.startTime && (
            <span className="text-red-500 text-sm">
              {errors.startTime.message}
            </span>
          )}
        </div>

        {/* End Time */}
        <div className="flex flex-col">
          <Label>End Time</Label>
          <Input
            type="time"
            {...register("endTime", {
              validate: (value) =>
                !value ||
                (!startTime && "Start time should be specified") ||
                value > startTime ||
                "End time must be after start time",
            })}
          />
          {errors.endTime && (
            <span className="text-red-500 text-sm">
              {errors.endTime.message}
            </span>
          )}
        </div>

        {/* location */}
        <div className="flex flex-col">
          <Label>location</Label>
          <Input {...register("location")} />
        </div>

        {/* Signup Deadline */}
        <div className="flex flex-col">
          <Label>Signup Deadline</Label>
          <Input type="date" {...register("signupDeadline", {valueAsDate: true})} />
        </div>

        {/* Tags (ChipInput) */}
        <div>
          <Label>Tags</Label>
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
          <Label>Additional Information</Label>
          <Textarea
            {...register("additionalInformation")}
            className="border rounded-md p-2"
            rows={3}
          />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col">
          <Label>Event Image (Max 2MB, JPG/PNG)</Label>
          <Input
            type="file"
            accept=".jpg,.png"
            {...register("image")}
            onChange={handleImageChange}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 h-32 object-contain rounded border"
            />
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded-md"
        >
          Submit Event
        </Button>
      </form>
    </div>
  );
}
