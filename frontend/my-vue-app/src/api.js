// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api", // адрес бэкенда (docker nginx → backend)
});

// === REQUEST: подставляем access-токен ===
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) 
    config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
let queue = [];

// === RESPONSE: авто-рефреш access при 401 ===
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    // если 401 и запрос еще не пытались повторить
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      const refresh = localStorage.getItem("refresh");
      if (!refresh) {
        // нет refresh — чистим и уходим на /login
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }

      // если уже идет процесс обновления — встаем в очередь
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject, original });
        });
      }

      // запускаем обновление токена
      isRefreshing = true;
      try {
        const { data } = await api.post ("/auth/token/refresh/", { refresh });
        localStorage.setItem("access", data.access);

        // Обновляем заголовок по умолчанию
        api.defaults.headers.common.Authorization = `Bearer ${data.access}`;
        isRefreshing = false;

        // повторяем отложенные запросы
        queue.forEach(({ resolve }) => resolve(api(original)));
        queue = [];

        // повторяем исходный запрос
        return api(original);
      } catch (e) {
        isRefreshing = false;
        queue.forEach(({ reject }) => reject(e));
        queue = [];

        // refresh тоже не сработал — выходим из аккаунта
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
