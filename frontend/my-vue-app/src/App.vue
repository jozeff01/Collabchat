<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <!-- Шапка только если пользователь вошёл -->
    <TopBar v-if="isAuth" />
    <router-view />
  </div>
</template>

<script setup>
import { computed } from "vue";
import TopBar from "./components/TopBar.vue";

const isAuth = computed(() => !!localStorage.getItem("access"));
</script>

