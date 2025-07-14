import axios from "axios";

const jobPostingApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

jobPostingApi.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default jobPostingApi;
