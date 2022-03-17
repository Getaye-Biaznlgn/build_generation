/* eslint-disable prettier/prettier */
import axios from "axios";
let apiClient = axios.create({
  baseURL: "http://10.161.178.167:80",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default apiClient;
