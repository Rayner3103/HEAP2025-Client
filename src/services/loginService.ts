import { apiService } from './apiService';

const API_BASE_URL = '/login';

export const userService = {
    getUserById: async (email: string, password: string) => {
        try {
            const res = await apiService.performRequest("POST", API_BASE_URL, { email : email , password : password});
            return res.data;
        } catch (e: any) {
            console.log("getEventByLink error:", e);
            throw new Error(e.response?.data?.message || "Login failed");
        }
    },
}