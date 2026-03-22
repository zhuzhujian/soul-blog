import type { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { setupRouterGuard } from "./guard";
import { adminMenuRoutes } from './routes';

const basicRoutes = [
  {
    name: "Login",
    path: "/login",
    component: () => import("@/views/home/login/index.vue"),
    isHidden: false,
    meta: {
      title: "登录页",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [...basicRoutes, ...adminMenuRoutes],
});

export const setupRouter = (app:App<Element>) => {
  setupRouterGuard(router)
  app.use(router)
}
