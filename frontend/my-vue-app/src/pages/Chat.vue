<template>
  <div class="flex h-screen">
    <!-- Левая панель -->
    <div class="w-64 bg-gray-800 p-4 text-white">
      <h2 class="text-xl font-bold mb-4">Каналы</h2>
      <ul class="space-y-2">
        <li class="p-2 bg-gray-700 rounded"># Общий</li>
        <li class="p-2 bg-gray-700 rounded"># Dev</li>
        <li class="p-2 bg-gray-700 rounded"># Off-topic</li>
      </ul>
    </div>

    <!-- Чат -->
    <div class="flex-1 flex flex-col bg-gray-900 text-white">
      <!-- Сообщения -->
      <div class="flex-1 overflow-y-auto p-4 space-y-2">
        <div v-for="msg in messages" :key="msg.id" class="bg-gray-700 p-2 rounded">
          <strong>{{ msg.user }}</strong>: {{ msg.text }}
        </div>
      </div>

      <!-- Поле ввода -->
      <div class="p-4 bg-gray-800 flex gap-2">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Введите сообщение..."
          class="flex-1 p-2 rounded text-black"
        />
        <button @click="sendMessage" class="bg-blue-600 px-4 rounded hover:bg-blue-700">Отправить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const newMessage = ref("")
const messages = ref([
  { id: 1, user: "User1", text: "Привет 👋" },
  { id: 2, user: "User2", text: "Привет, как дела?" },
])

const sendMessage = () => {
  if (!newMessage.value) return
  messages.value.push({
    id: Date.now(),
    user: "Я",
    text: newMessage.value,
  })
  newMessage.value = ""
}
</script>
