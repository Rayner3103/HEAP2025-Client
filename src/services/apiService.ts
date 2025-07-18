/// <reference types="vite/client" />
import axios from "axios";

const API_URL = import.meta.env.VITE_PUBLIC_API_URL;
// console.log("API_URL ", API_URL);

export const apiService = {
    // Method to perform API requests with authorization headers
    performRequest: async function(method: string, url: string, data?: any, token?: string, formData = false) {
        try {
            // Initialize headers object
            const headers: Record<string, string> = {"Content-Type" : "application/json"};

            // If there's a token, include authorization header
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            // If formData is true, include Content-Type header
            if (formData) {
                headers['Content-Type'] = 'multipart/form-data';
            }

            const apiClient = axios.create({
                baseURL: API_URL,
                headers: headers,
                withCredentials: true,
            })

            let response;
            // Perform different HTTP methods based on the method parameter
            switch (method) {
                case "GET":
                    if (data) {
                        const queryParams = Object.keys(data || {})
                            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
                            .join('&');
                        response = await apiClient.get(url + "?" + queryParams);
                        break;
                    } else {
                        response = await apiClient.get(url);
                        break;
                    }
                case "POST":
                    response = await apiClient.post(url, data);
                    break;
                case "PATCH":
                    response = await apiClient.patch(url, data);
                    break;
                case "DELETE":
                    response = await apiClient.delete(url);
                    break;
                default:
                    throw new Error("Unsupported HTTP method");
            }
            return response;
        } catch (error) {
            throw error;
        }
    },
}