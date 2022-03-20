import axios from "axios";
let apiClient = axios.create({
  baseURL: "https://build-generation.merahitechnologies.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default apiClient;
