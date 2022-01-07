import axios from "axios";
import auth from "@react-native-firebase/auth";
import { config } from "~/config";

const API = axios.create({
  baseURL: config.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
});

API.interceptors.request.use(
  async (axiosConfig) => {
    const token = await auth().currentUser?.getIdToken();
    if (token && axiosConfig.headers) {
      axiosConfig.headers.Authorization = `Bearer ${token}`;
    }
    return axiosConfig;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (err) => {
    return Promise.reject({
      message: err?.response?.data?.error || err.message,
    });
  }
);

export { API };
