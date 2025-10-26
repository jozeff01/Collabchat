<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
    <h1 class="text-3xl font-bold mb-6">Регистрация</h1>
    <form class="flex flex-col gap-4 w-80" @submit.prevent="submit">

      <!-- Имя -->
      <div class="flex flex-col">
        <input v-model="form.username" type="text" placeholder="Имя"
          class="p-2 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500" />
        <p v-if="errors.username" class="text-red-400 text-sm mt-1">{{ errors.username }}</p>
      </div>

      <!-- Email -->
      <div class="flex flex-col">
        <input v-model="form.email" type="email" placeholder="Email"
          class="p-2 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500" />
        <p v-if="errors.email" class="text-red-400 text-sm mt-1">{{ errors.email }}</p>
      </div>

      <!-- Пароль -->
      <div class="flex flex-col">
        <input v-model="form.password" type="password" placeholder="Пароль"
          class="p-2 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500" />
        <p v-if="errors.password" class="text-red-400 text-sm mt-1">{{ errors.password }}</p>
      </div>

      <!-- Кнопка -->
      <button class="bg-green-600 py-2 rounded hover:bg-green-700" :disabled="loading">
        {{ loading ? "Отправка..." : "Зарегистрироваться" }}
      </button>

      <!-- Общая ошибка (если есть) -->
      <p v-if="errors.non_field" class="text-red-400 text-sm text-center mt-2">{{ errors.non_field }}</p>
    </form>

    <p class="mt-4 text-sm">
      Уже есть аккаунт? <router-link to="/login" class="text-green-400">Войти</router-link>
    </p>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import api from "../api"

const form = reactive({ username: "", email: "", password: "" });
const loading = ref(false);
const errors = reactive({ username: "", email: "", password: "", non_field: "" });

const submit = async () => {
  Object.keys(errors).forEach(key => errors[key] = ""); // очистка ошибок
  loading.value = true;

  try {
    await api.post("/api/auth/register/", form);

    const { data } = await api.post("/api/auth/login/", {
      email: form.email,
      password: form.password,
    });
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);

    // очистка формы после успеха
    form.username = "";
    form.email = "";
    form.password = "";

  } catch (e) {
    if (e.response?.data) {
      const data = e.response.data;

      if (data.username) errors.username = "Поле не может быть пустым.";
      if (data.email) errors.email = "Поле не может быть пустым.";
      if (data.password) errors.password = data.password.join(", ");
      if (!data.username && !data.email && !data.password) {
        errors.non_field = "Ошибка регистрации. Попробуйте снова.";
      }
    } else {
      errors.non_field = "Ошибка соединения с сервером.";
    }
  } finally {
    loading.value = false;
  }
};




// import { reactive, ref } from "vue";
// import api from "../api"

// const form = reactive({username: "", email: "", password: ""});
// const loading = ref(false);
// const error = ref("");

// const submit = async () => {
//   error.value = "";
//   loading.value = true;
//   try {
//     await api.post("/api/auth/register/", form);
//     const { data } = await api.post("/api/auth/login/", {
//       email: form.email,
//       password: form.password,
//     });
//     localStorage.setItem("access", data.access);
//     localStorage.setItem("refresh", data.refresh);
//   } catch (e) {
//     error.value = e.response?.data ? JSON.stringify(e.response.data) : "Ошибка регистрации";
//   } finally {
//     loading.value = false;
//   }
// };

</script>