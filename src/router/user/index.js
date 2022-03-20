export default {
  path: "/",
  name: "Index",
  component: () =>
    import(/* webpackChunkName: "index" */ "../../views/Index.vue"),
  children: [
    {
      path: "/",
      name: "Home",
      component: () =>
        import(/* webpackChunkName: "Home" */ "../../views/Home.vue"),
    },
  ],
};
