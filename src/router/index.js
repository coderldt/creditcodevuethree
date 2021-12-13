import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "/creditQuery",
    name: "creditQuery",
    component: () => import("@/views/creditQuery/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
