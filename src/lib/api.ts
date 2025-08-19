import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://sharesphere-backend-19bi.onrender.com";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
