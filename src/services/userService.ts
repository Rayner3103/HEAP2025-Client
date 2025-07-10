import * as UserInterface from '@/interface/user';
import { apiService } from './apiService';

const API_BASE_URL = '/user';

export const userService = {
    getUserById: async (userId: string, context: string) => {
        try {
            const res = await apiService.performRequest("GET", API_BASE_URL, { userId : userId }, context);
            return res.data;
        } catch (e: any) {
            console.log("getEventByLink error:", e);
            throw new Error(e.response?.data?.error || "Fetching user failed");
        }
    },

    createUser: async (userData: JSON) => {
        try {
            const res = await apiService.performRequest("POST", API_BASE_URL, { userData : userData });
            return res.data;
        } catch (e: any) {
            console.log("createEvent error:", e);
            throw new Error(e.response?.data?.error || "Creating user failed");
        }
    },

    updateUser: async (userId: string, updateData: UserInterface._User, token: string) => {
        try {
            const res = await apiService.performRequest("PATCH", API_BASE_URL, { userId : userId , updateData : updateData }, token);
            return res.data;
        } catch (e: any) {
            console.log("updateEvent error:", e);
            throw new Error(e.response?.data?.error || "Updating user failed");
        }
    },

    deleteUser: async (userId: string, context: string) => {
        try {
            const res = await apiService.performRequest("DELETE", API_BASE_URL, { userId : userId }, context);
            return res.data;
        } catch (e: any) {
            console.log("deleteEvent error:", e);
            throw new Error(e.response?.data?.error || "Deleting user failed");
        }
    },
}