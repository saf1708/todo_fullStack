import axios from "axios";

const api = axios.create({
  baseURL: "https://todo-fullstack-x4go.onrender.com/api/v1",
  withCredentials: true,
});

export default api;