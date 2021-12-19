import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
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
  {
    path: "/creditReport",
    name: "creditReport",
    component: () => import("@/views/creditReport/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
