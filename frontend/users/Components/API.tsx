import axios from "axios";

export const API = axios.create({
  baseURL: "https://ecomm-assg.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});
