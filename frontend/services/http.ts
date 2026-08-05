import axios from "axios";

export const userApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_USER_SERVICE_URL ?? "http://localhost:8081/api",
  headers: { "Content-Type": "application/json" },
});

export const productApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL ?? "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

export const contactApi = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_NOTIFICATION_SERVICE_URL ??
    "http://localhost:8082/api",
  headers: { "Content-Type": "application/json" },
});
