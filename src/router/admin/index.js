export default {
  path: "/admin",
  name: "AdminDashboard",
  component: () =>
    import(
      /* webpackChunkName: "Admindashboard" */ "../../views/admin/AdminDashboard.vue"
    ),
  meta: {
    authRequired: true,
  },
  children: [
    {
      path: "/admin/",
      name: "DonatedFund",
      component: () =>
        import(
          /* webpackChunkName: "DonatedFunds" */ "../../views/admin/DonatedFund.vue"
        ),
    },
    {
      path: "/admin/damaged-educational-institution",
      name: "EducationalInstitution",
      component: () =>
        import(
          /* webpackChunkName: "EducationalInstitution" */ "../../views/admin/EducationalInstitution.vue"
        ),
    },

    {
      path: "/admin/damaged-healthcare-institution",
      name: "HealthCareInstitution",
      component: () =>
        import(
          /* webpackChunkName: "HealthCareInstitution" */ "../../views/admin/HealthCareInstitution.vue"
        ),
    },
    {
      path: "/admin/institution-detail",
      name: "InstitutionDetail",
      component: () =>
        import(
          /* webpackChunkName: "InstitutionDetail" */ "../../views/admin/InstitutionDetail.vue"
        ),
      props: (route) => ({
        institute: { ...route.params },
      }),
    },
    {
      path: "/admin/damaged-region",
      name: "Region",
      component: () =>
        import(/* webpackChunkName: "Region" */ "../../views/admin/Region.vue"),
    },
    {
      path: "/admin/damaged-zone",
      name: "Zone",
      component: () =>
        import(/* webpackChunkName: "Zone" */ "../../views/admin/Zone.vue"),
    },
    {
      path: "/admin/success-stories",
      name: "SuccessStory",
      component: () =>
        import(
          /* webpackChunkName: "SuccessStory" */ "../../views/admin/SuccessStory.vue"
        ),
    },
    {
      path: "/admin/new-detail",
      name: "NewsDetail",
      component: () =>
        import(
          /* webpackChunkName: "NewsDetail" */ "../../views/admin/NewsDetail.vue"
        ),
    },
    {
      path: "/admin/coordinator",
      name: "Coordinator",
      component: () =>
        import(
          /* webpackChunkName: "Coordinator" */ "../../views/admin/Coordinator.vue"
        ),
    },
    {
      path: "/admin/account-setting",
      name: "AccountSetting",
      component: () =>
        import(
          /* webpackChunkName: "AccountSetting" */ "../../views/admin/AccountSetting.vue"
        ),
    },
  ],
};
