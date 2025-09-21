import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "https://localhost:7211/api/", // 👈 update if your backend runs on another port
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
    (response) => {
      if(response.data?.message){
        toast.success(response.data.message);
      }
      return response.data?.data ?? response.data;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        // clear local storage/session if needed
        
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("kanban");
        localStorage.removeItem("token");
  
        // redirect to login
        window.location.href = "/login";
      }else {
        toast.error("Unexpected error occurred.");
      }
      return Promise.reject(error);
    }
  );
  

export default api;
