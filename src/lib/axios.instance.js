import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", //backend url
});

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
export default axiosInstance;
