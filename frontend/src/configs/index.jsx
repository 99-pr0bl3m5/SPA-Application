import axios from "axios";
import { APP_SETTING } from "../env";

axios.defaults.baseURL = APP_SETTING.WEB_API;

axios.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      request.headers.Authorization = token;
    }

    return request;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login";
    }
    throw error;
  }
);

axios.interceptors.response.use(
  (res) => {
    if (res.status === 401) {
      window.location.href = "/login";
    }
    return res;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login";
    }
    throw error;
  }
);
