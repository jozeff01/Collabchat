<template>
  <div class="w-full bg-gray-800 text-white p-3 flex items-center justify-between">
    <div class="font-bold">CollabChat</div>
    <button @click="logout" class="text-sm bg-red-600 px-3 py-1 rounded hover:bg-red-700">
      Выйти
    </button>
  </div>
</template>

<script setup>
function logout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  window.location.href = "/login";
}
</script>
