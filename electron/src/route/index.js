import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
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
