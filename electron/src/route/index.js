import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/index",
      name: "index",
      component: () => import("@/pages/Home/index"),
    },
    {
      path: "/",
      name: "baselayout",
      component: () => import("@/layout/BaseLayout/index"),
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("@/pages/Home/index"),
        },
        {
          path: "/security",
          name: "securitylayout",
          component: () => import("@/layout/SecurityLayout/index"),
          children: [
            {
              path: "needlogin",
              name: "needlogin",
              component: () => import("@/pages/NeedLogin/index"),
            },
            {
              path: "/*",
              name: "404",
              component: () => import("@/error/ErrorPage/index"),
            },
          ],
        },
        {
          path: "/*",
          name: "404",
          component: () => import("@/error/ErrorPage/index"),
        },
      ],
    },
    {
      path: "/*",
      name: "404",
      component: () => import("@/error/ErrorPage/index"),
    },
  ],
});

createApp().use(router);

export default router;
