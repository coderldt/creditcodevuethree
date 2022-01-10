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
  {
    path: "/creditReport",
    name: "creditReport",
    component: () => import("@/views/creditReport/index.vue"),
  },
  {
    path: "/relationship",
    name: "relationship",
    component: () => import("@/views/relationship/index.vue"),
  },
  {
    path: "/risk/check",
    name: "riskCheck",
    component: () => import("@/views/risk/check/index.vue"),
  },
  {
    path: "/risk/focusDetail",
    name: "riskFocusDetail",
    component: () => import("@/views/risk/focus/index.vue"),
  },
  {
    path: "/system/user",
    name: "systemUser",
    component: () => import("@/views/system/user/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
