<template>
  <nav class="navbar-light side-bar">
    <ul class="navbar-nav pt-2 px-2">
      <li>
        <router-link
          class="nav-link py-2 ps-2 fw-bold"
          :to="{ name: 'DonatedFund' }"
          >Donated Fund</router-link
        >
      </li>
      <li v-if="user.role?.name === 'super_admin'">
        <router-link
          class="nav-link py-2 ps-2 fw-bold"
          :to="{ name: 'Coordinator' }"
          >Coordinators</router-link
        >
      </li>
      <li>
        <div>
          <a
            class="nav-link py-2 ps-2 collapsible-link fw-bold pe-2 d-flex justify-content-between"
            href="#institution"
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
            aria-controls="collapseInstitution"
          >
            <span>Damaged Institutions</span>
            <span class="dropdown-icon pt-1"
              ><i class="fas fa-chevron-right"></i
            ></span>
          </a>
        </div>
        <div class="collapse ms-3" id="institution">
          <router-link
            class="nav-link py-2 px-2 fw-bold d-block"
            :to="{ name: 'EducationalInstitution' }"
            >Educational</router-link
          >
          <router-link
            class="nav-link py-2 px-2 fw-bold d-block"
            :to="{ name: 'HealthCareInstitution' }"
            >Health Care</router-link
          >
        </div>
      </li>
      <li>
        <div>
          <a
            class="nav-link py-2 ps-2 collapsible-link fw-bold pe-2 d-flex justify-content-between"
            href="#location"
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
            aria-controls="collapseInstitution"
          >
            <span>Location</span>
            <span class="dropdown-icon pt-1"
              ><i class="fas fa-chevron-right"></i
            ></span>
          </a>
        </div>
        <div class="collapse ms-3" id="location">
          <router-link
            class="nav-link py-2 px-2 fw-bold d-block"
            :to="{ name: 'Region' }"
            >Region</router-link
          >
          <router-link
            class="nav-link py-2 px-2 fw-bold d-block"
            :to="{ name: 'Zone' }"
            >Zone</router-link
          >
        </div>
      </li>
      <li>
        <router-link
          class="nav-link py-2 ps-2 fw-bold"
          :to="{ name: 'SuccessStory' }"
          >Success Stories</router-link
        >
      </li>
      <li>
        <router-link
          class="nav-link py-2 ps-2 fw-bold"
          :to="{ name: 'AccountSetting' }"
          >Account Setting</router-link
        >
      </li>
      <li class="fw-bold ps-3 mt-4">
        <button @click="logout" class="btn bg-dark-blue text-white px-3">
          <span
            v-if="isLoading"
            class="spinner-border spinner-border-sm mx-2"
            role="status"
            aria-hidden="true"
          ></span>
          Logout
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import apiClient from "../../resources/baseUrl";
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    async logout() {
      try {
        this.isLoading = true;
        var response = await apiClient.post("/api/logout");
        if (response.status === 200) {
          apiClient.defaults.headers.common["Authorization"] = null;
          this.$store.commit("setToken", "");
          this.$store.commit("setIsAuthenticated", false);

          localStorage.removeItem("tokenB");
          localStorage.removeItem("user");
          this.$router.push({ name: "Login" });
        } else {
          throw "faild";
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.dropdown-icon {
  transition: all ease 0.23s;
}
.collapsible-link[aria-expanded="true"] .dropdown-icon {
  transform: rotate(90deg);
}
.active {
  background-color: #fff;
  border-radius: 10px;
}
</style>
