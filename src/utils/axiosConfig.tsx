import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API;
const timeout = 5 * 1000;
const headers = {
  "Content-Type": "application/json",
};

const axiosInstance = axios.create({
  baseURL,
  timeout,
  headers,
  withCredentials: true,
});

export default axiosInstance;
