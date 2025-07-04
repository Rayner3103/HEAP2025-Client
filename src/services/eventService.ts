import { apiService } from './apiService';

const API_BASE_URL = '/event';

export const eventService = {
    getEventByLink: async (signupLink?: string) => {
        try {
            const res = await apiService.performRequest("GET", API_BASE_URL, {signupLink : signupLink});
            return res.data;
        } catch (e: any) {
            console.log("getEventByLink error:", e);
            throw new Error(e.response?.data?.message || "Fetching events failed");
        }
    },

    createEvent: async (eventData: FormData, context: string) => {
        try {
            const res = await apiService.performRequest("POST", API_BASE_URL, { eventData : eventData }, context, true);
            return res.data;
        } catch (e: any) {
            console.log("createEvent error:", e);
            throw new Error(e.response?.data?.message || "Creating events failed");
        }
    },

    updateEvent: async (signupLink: string, updateData: JSON, context: string) => {
        try {
            const res = await apiService.performRequest("PATCH", API_BASE_URL, { signupLink : signupLink , updateData : updateData }, context);
            return res.data;
        } catch (e: any) {
            console.log("updateEvent error:", e);
            throw new Error(e.response?.data?.message || "Updating events failed");
        }
    },

    deleteEvent: async (signupLink: string, context: string) => {
        try {
            const res = await apiService.performRequest("DELETE", API_BASE_URL, { signupLink : signupLink }, context);
            return res.data;
        } catch (e: any) {
            console.log("deleteEvent error:", e);
            throw new Error(e.response?.data?.message || "Deleting events failed");
        }
    },
}