import axios from "axios";
import { config } from "process";
import { toast } from "react-hot-toast";

const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "Application/Json",
  },
});

api.interceptors.request.use((config) => {
  config.headers.authorization = `${localStorage.getItem("token")}`; //TODO: COLOCAR BEARER
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error ? error.response.status : null;

    if (status == 401) {
      console.log("entrou aqui");
      window.location.href = "/login";
      localStorage.removeItem("token");
      toast.error("Sessão expirada");
    }
    return Promise.reject(error);
  }
);

export default api;
