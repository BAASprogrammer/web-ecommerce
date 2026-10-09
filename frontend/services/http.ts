import axios from "axios";

// Api para el servicio de usuarios
export const userApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_USER_SERVICE_URL ?? "http://localhost:8081/api",
  headers: { "Content-Type": "application/json" },
});

// Api para el servicio de productos
export const productApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL ?? "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

// Api para el servicio de notificaciones
export const contactApi = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_NOTIFICATION_SERVICE_URL ??
    "http://localhost:8082/api",
  headers: { "Content-Type": "application/json" },
});

// Api para el servicio de IA
export const aiApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AI_SERVICE_URL ?? "http://localhost:8090/api/ai",
  headers: { "Content-Type": "application/json" },
});
