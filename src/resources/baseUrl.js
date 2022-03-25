import axios from "axios";
let apiClient = axios.create({
  baseURL: "https://build-generation.merahitechnologies.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
// http://10.161.166.108:80
//
export default apiClient;
