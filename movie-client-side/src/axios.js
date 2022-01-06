import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8888/api",
  headers: {
    token: "Bearer " + JSON.parse(localStorage.getItem("netflix"))?.accessToken,
  },
});

export default axiosInstance;
