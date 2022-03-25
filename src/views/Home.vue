<template>
  <div class="d-none d-lg-block my-3">
    <strong class="fs-5">{{ $t("title", $store.state.lang) }}</strong>
  </div>
  <!-- image/photo -->
  <div class="container px-0">
    <div class="row">
      <div class="col-lg-8">
        <img src="../assets/landing.jpg" class="img-fluid rounded rounded" />
      </div>
      <div class="d-block d-lg-none text-center my-3">
        <strong class="fs-5">{{ $t("title", $store.state.lang) }}</strong>
      </div>
      <div class="col-lg-4 mt-4 mt-lg-0">
        <donation-card @showSocialShare="showShareModal"></donation-card>
      </div>
    </div>
  </div>
  <hr class="my-4" />
  <!-- education and healthcare tab -->
  <div class="container my-4 px-0 d-flex justify-content-between">
    <div class="btn-group btn-group-lg" role="group" aria-label="Basic example">
      <button
        @click="selectTab('HealthcareTab')"
        :class="{ 'btn-primary': selectedTab === 'HealthcareTab' }"
        class="btn border"
      >
        {{ $t("institution.healthcare", $store.state.lang) }}
      </button>
      <button
        @click="selectTab('EducationTab')"
        :class="{ 'btn-primary': selectedTab === 'EducationTab' }"
        class="btn border"
      >
        {{ $t("institution.educational", $store.state.lang) }}
      </button>
    </div>
    <button @click="seeAll" class="btn btn-warning shadwo-sm">
      {{ $t("btn.seeAll", $store.state.lang) }}
    </button>
  </div>
  <component
    :educationalInstitutions="educationalInstitutions"
    :healthcareInstitutions="healthcareInstitutions"
    :is="selectedTab"
  />
  <hr />
  <success-tab />
  <hr />
  <how-it-work />
</template>

<script>
import DonationCard from "../components/home/DonationCard.vue";
import EducationTab from "../components/home/EducationTab.vue";
import HealthcareTab from "../components/home/HealthcareTab.vue";
import SuccessTab from "../components/home/SuccessStory.vue";
import HowItWork from "../components/home/HowItWork.vue";
import apiClient from "../resources/baseUrl";
export default {
  emits: {
    showShareModal() {
      return true;
    },
  },
  components: {
    DonationCard,
    EducationTab,
    HealthcareTab,
    SuccessTab,
    HowItWork,
  },
  data() {
    return {
      selectedTab: "HealthcareTab",
      educationalInstitutions: [],
      healthcareInstitutions: [],
    };
  },
  methods: {
    showShareModal() {
      this.$emit("showShareModal");
    },
    seeAll() {
      if (this.selectedTab === "EducationTab")
        this.$router.push({ name: "UserEducationalInstitution" });
      else this.$router.push({ name: "UserHealthcareInstitution" });
    },
    selectTab(name) {
      this.selectedTab = name;
    },
    async fetchHealthInstitutions() {
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get(
          "/api/user_posts?type=health&&per_page=3&&page_no=1"
        );
        if (response.status === 200) {
          this.healthcareInstitutions = response.data.data;
        }
      } catch (e) {
        //
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
    async fetchEducationalInstitutions() {
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get(
          `/api/user_posts?type=education&&per_page=3&&page_no=1`
        );
        if (response.status === 200) {
          this.educationalInstitutions = response.data.data;
        }
      } catch (e) {
        //
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
  },
  created() {
    this.fetchEducationalInstitutions();
    this.fetchHealthInstitutions();
  },
};
</script>
