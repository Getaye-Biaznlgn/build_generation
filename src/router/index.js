import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import admin from "./admin";
const routes = [
  admin,
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/admin/Login.vue"),
  },
  {
    path: "/reset-password/:code",
    props: true,
    name: "ResetPassword",
    component: () =>
      import(
        /* webpackChunkName: "reset-password" */ "../views/admin/ResetPassword.vue"
      ),
  },
  {
    path: "/email-verification",
    name: "EmailVerification",
    component: () =>
      import(
        /* webpackChunkName: "email-verification" */ "../views/admin/EmailVerification.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.authRequired) &&
    !localStorage.getItem("tokenB")
  ) {
    return next({ name: "Login", query: { to: to.path } });
  }
  return next();
});
export default router;
