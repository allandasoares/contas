import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        "Content-Type": 'Application/Json'
    }
})

export default api;