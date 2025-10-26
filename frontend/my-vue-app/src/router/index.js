import { createRouter, createWebHistory } from "vue-router"
import Login from "../pages/Login.vue"
import Register from "../pages/Register.vue"
import Rooms from "../pages/Rooms.vue"
import Chat from "../pages/Chat.vue"

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/rooms", component: Rooms, meta: { registerAuth: true } },
  { path: "/rooms/:id", component: Chat, props: true, meta: {registerAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.meta.registerAuth) {
    const token = localStorage.getItem("access");
  }
});

export default router;
