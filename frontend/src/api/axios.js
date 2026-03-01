import axios from "axios";

const api = axios.create({
  baseURL: "https://todo-fullstack-x4go.onrender.com",
  withCredentials: true,
});

export default api;