import axios from "axios";

// Base URL of backend server
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Update if different
});

// Add auth token to headers if exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("foodaid_token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
