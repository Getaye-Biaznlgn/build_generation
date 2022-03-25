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
    {
      path: "/damaged-educational-institution",
      name: "UserEducationalInstitution",
      component: () =>
        import(
          /* webpackChunkName: "Educational-Institution" */ "../../views/EducationalInstitution.vue"
        ),
    },
    {
      path: "/damaged-healthcare-institution",
      name: "UserHealthcareInstitution",
      component: () =>
        import(
          /* webpackChunkName: "healthcare-Institution" */ "../../views/HealthcareInstitution.vue"
        ),
    },
    {
      path: "/institution-detail/:id",
      props: true,
      name: "UserInstitutionDetail",
      component: () =>
        import(
          /* webpackChunkName: "institution-detail" */ "../../views/InstitutionDetail.vue"
        ),
    },
    {
      path: "/success-story-detail/:id",
      props: true,
      name: "SuccessStoryDetail",
      component: () =>
        import(
          /* webpackChunkName: "success-detail" */ "../../views/SuccessStoryDetail.vue"
        ),
    },
    {
      path: "/success-story",
      name: "UserSuccessStory",
      component: () =>
        import(
          /* webpackChunkName: "success-story" */ "../../views/SuccessStory.vue"
        ),
    },
    {
      path: "/donations",
      name: "TheDonations",
      props: true,
      component: () =>
        import(
          /* webpackChunkName: "the-donations" */ "../../views/TheDonations.vue"
        ),
    },
    {
      path: "/donation-payment",
      name: "Payments",
      component: () =>
        import(/* webpackChunkName: "payaments" */ "../../views/Payments.vue"),
    },
    {
      path: "/about",
      name: "About",
      component: () =>
        import(/* webpackChunkName: "about" */ "../../views/About.vue"),
    },
  ],
};
