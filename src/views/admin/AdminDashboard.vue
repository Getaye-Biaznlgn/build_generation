<template>
  <the-header></the-header>
  <div class="d-flex">
    <div class="sidebar shadow">
      <the-sidebar></the-sidebar>
    </div>
    <div class="container-fluid position-relative content bg-too-light-gray">
      <router-view></router-view>
    </div>
  </div>
  <div
    v-if="isLoading"
    class="route-loading p-0 position-fixed top-0 start-0 bottom-0 end-0 w-100 h-100"
  >
    <div class="loading-spinner">
      <img src="../../assets/preloader.gif" alt="slow connection" />
    </div>
  </div>
</template>

<script>
import TheSidebar from "../../components/admin/TheSidebar.vue";
import TheHeader from "../../components/admin/TheHeader.vue";
import apiClient from "../../resources/baseUrl";
export default {
  components: { TheSidebar, TheHeader },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  beforeCreate() {
    if (localStorage.getItem("tokenB")) {
      let token = localStorage.getItem("tokenB");
      this.$store.commit("setToken", token);
      this.$store.commit("setIsAuthenticated", true);
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    if (localStorage.getItem("user")) {
      let user = localStorage.getItem("user");
      // console.log("user", user);
      this.$store.commit("setUser", JSON.parse(user));
    }
  },
  created() {
    this.$store.dispatch("fetchRegions");
    this.$store.dispatch("fetchZones");
  },
};
</script>

<style scoped>
.route-loading {
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.sidebar {
  background-color: #ecf1fe;
  min-height: 100vh;
  width: 20% !important;
}
.loading-spinner {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* z-index: 1; */
}
</style>

<style>
table {
  border-collapse: collapse;
  width: 100%;
}
/* new design change start*/
tr:last-child {
  border-bottom: 2px solid hsl(231, 16%, 91%);
}
th {
  text-align: left;
  padding: 8px;
}
tr {
  border-top: 2px solid hsl(231, 16%, 91%);
}
td {
  text-align: left;
  padding: 8px;
  vertical-align: top;
}
.text-dark-blue {
  color: #2f4587;
}
.bg-dark-blue {
  background-color: #2f4587;
}
.warining input,
.warining textarea {
  border: 1px red solid;
}
.warining span {
  display: inline;
  color: red;
  font-size: 14px;
}
</style>
