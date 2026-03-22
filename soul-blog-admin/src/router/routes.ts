export const adminMenuRoutes:any[] = [
  {
    name: "home",
    path: "/home",
    component: () => import("@/views/layout/index.vue"),
    meta: {
      title: "首页",
    },
  }
];
