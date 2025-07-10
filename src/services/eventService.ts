import { apiService } from "./apiService";

const API_BASE_URL = "/event";

export const eventService = {
  getEvents: async () => {
    try {
      const res = await apiService.performRequest("GET", "/get_all");
      return res.data;
    } catch (e: any) {
      console.log("getEventByLink error:", e);
      throw new Error(e.response?.data?.error || "Fetching events failed");
    }
  },
  getEventById: async (eventId: string) => {
    try {
      const res = await apiService.performRequest("GET", API_BASE_URL, {
        eventId: eventId,
      });
      return res.data;
    } catch (e: any) {
      console.log("getEventByLink error:", e);
      throw new Error(e.response?.data?.error || "Fetching events failed");
    }
  },
  createEvent: async (eventData: FormData, context: string) => {
    try {
      const res = await apiService.performRequest(
        "POST",
        API_BASE_URL,
        { eventData: eventData },
        context,
        true
      );
      return res.data;
    } catch (e: any) {
      console.log("createEvent error:", e);
      throw new Error(e.response?.data?.error || "Creating events failed");
    }
  },

  updateEvent: async (
    eventId: string,
    updateData: JSON,
    context: string
  ) => {
    try {
      const res = await apiService.performRequest(
        "PATCH",
        API_BASE_URL,
        { eventId: eventId, updateData: updateData },
        context
      );
      return res.data;
    } catch (e: any) {
      console.log("updateEvent error:", e);
      throw new Error(e.response?.data?.error || "Updating events failed");
    }
  },

  deleteEvent: async (eventId: string, context: string) => {
    try {
      const res = await apiService.performRequest(
        "DELETE",
        API_BASE_URL,
        { eventId: eventId },
        context
      );
      return res.data;
    } catch (e: any) {
      console.log("deleteEvent error:", e);
      throw new Error(e.response?.data?.error || "Deleting events failed");
    }
  },
};
