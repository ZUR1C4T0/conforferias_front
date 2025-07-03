import axios from "axios";

export const axiosInstance = axios.create({
  adapter: "fetch", // Use the fetch adapter
  baseURL: process.env.BACKEND_URL,
  timeout: 1000,
});
