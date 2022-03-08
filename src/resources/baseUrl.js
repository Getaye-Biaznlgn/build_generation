import axios from "axios";
let apiClient = axios.create({
    baseURL: 'http://10.161.166.108:8000',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
})

export default apiClient