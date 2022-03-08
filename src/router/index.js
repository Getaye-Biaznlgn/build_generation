import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import admin from './admin'
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
      import(/* webpackChunkName: "about" */ "../views/admin/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active'
});


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired) && !localStorage.getItem('tokenB')) {
      return next({ name: 'Login', query: { to: to.path } })
  } 
  return next()
})
export default router;
