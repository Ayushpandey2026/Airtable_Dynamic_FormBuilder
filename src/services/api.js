// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000/api",
  withCredentials: true, // if backend uses cookies; optional
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
