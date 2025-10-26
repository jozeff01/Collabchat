<template>
  <div class="flex h-screen">
    <!-- Левая панель -->
    <div class="w-64 bg-gray-800 p-4 text-white">
      <h2 class="text-xl font-bold mb-4">Мои комнаты</h2>
      <ul class="space-y-2">
        <li v-for="room in rooms" :key="room.id">
          <router-link
            :to="`/rooms/${room.id}`"
            class="block p-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            {{ room.name }}
          </router-link>
        </li>
      </ul>
      <button class="mt-4 w-full bg-blue-600 py-2 rounded hover:bg-blue-700">+ Создать комнату</button>
    </div>

    <!-- Правая часть -->
    <div class="flex-1 flex items-center justify-center bg-gray-900 text-white">
      <p class="text-lg">Выберите комнату слева</p>
    </div>
  </div>
</template>

<script setup>
const rooms = [
  { id: 1, name: "Общий" },
  { id: 2, name: "Разработка" },
  { id: 3, name: "Флудилка" },
]
</script>
