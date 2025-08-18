import axios from "axios";

const api = axios.create({
  baseURL: "https://yourapiurl",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
