<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
    <h1 class="text-3xl font-bold mb-6">Вход</h1>
    <form class="flex flex-col gap-4 w-80" @submit.prevent="submit" novalidate>
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        required
        autocomplete="email"
        class="p-2 rounded bg-gray-800 border border-gray-600 text-white
               placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <p v-if="errors.email" class="text-red-400 text-sm">{{ errors.email }}</p>

      <input
        v-model="password"
        type="password"
        placeholder="Пароль"
        required
        autocomplete="current-password"
        class="p-2 rounded bg-gray-800 border border-gray-600 text-white
               placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <p v-if="errors.password" class="text-red-400 text-sm">{{ errors.password }}</p>

      <button
        class="bg-blue-600 py-2 rounded hover:bg-blue-700 disabled:opacity-70"
        :disabled="loading || !email || !password"
        aria-busy="loading"
      >
        {{ loading ? "Входим..." : "Войти" }}
      </button>

      <p v-if="errors.non_field" class="text-red-400 text-sm">{{ errors.non_field }}</p>
    </form>

    <p class="mt-4 text-sm">
      Нет аккаунта?
      <router-link to="/register" class="text-blue-400">Регистрация</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../api";

const router = useRouter();

const email = ref("");
const password = ref("");
const loading = ref(false);

const errors = ref({
  email: "",
  password: "",
  non_field: "",
});

const submit = async () => {
  errors.value = { email: "", password: "", non_field: "" };
  loading.value = true;

  try {
    const { data } = await api.post("/api/auth/login/", {
      email: email.value.trim(),
      password: password.value,
    });

    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);

    // Настроим заголовок для последующих запросов
    api.defaults.headers.common.Authorization = `Bearer ${data.access}`;

    await router.push("/rooms");
  } catch (e) {
    if (e.response?.data) {
      const data = e.response.data;

      if (data.email) errors.value.email = "Пользователь с таким email не найден.";
      if (data.password) errors.value.password = "Неверный пароль.";

      if (data.detail) {
        if (data.detail.includes("No active account")) {
          errors.value.non_field = "Неверный email или пароль.";
        } else {
          errors.value.non_field = data.detail;
        }
      }
    } else {
      errors.value.non_field = "Ошибка входа. Попробуйте снова.";
    }
  } finally {
    loading.value = false;
  }
};
</script>
