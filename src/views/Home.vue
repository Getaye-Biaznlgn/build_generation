<template>
  <div class="d-none d-lg-block my-3">
    <strong class="fs-5"
      >Fund Raising for Re-establishing Damaged Institution By TPLF in
      Ethiopia</strong
    >
  </div>
  <!-- image/photo -->
  <div class="container px-0">
    <div class="row">
      <div class="col-lg-8">
        <img src="../assets/landing.jpg" class="img-fluid rounded rounded" />
      </div>
      <div class="d-block d-lg-none my-3">
        <strong class="fs-5"
          >Fund Raising for Re-establishing Damaged Institution By TPLF in
          Ethiopia</strong
        >
      </div>
      <div class="col-lg-4 mt-4 mt-lg-0">
        <donation-card />
      </div>
    </div>
  </div>
  <hr class="my-4" />
  <!-- education and healthcare tab -->
  <div class="container my-4 px-0 d-flex justify-content-between">
    <div class="btn-group" role="group" aria-label="Basic example">
      <button
        @click="selectTab('HealthcareTab')"
        :class="{ 'btn-primary': selectedTab === 'HealthcareTab' }"
        class="btn border"
      >
        Healthcare Institution
      </button>
      <button
        @click="selectTab('EducationTab')"
        :class="{ 'btn-primary': selectedTab === 'EducationTab' }"
        class="btn border"
      >
        Educational Institution
      </button>
    </div>
    <div class="btn btn btn-warning shadwo-sm">See All</div>
  </div>
  <component :is="selectedTab" />
  <hr />
  <success-tab />
</template>

<script>
import DonationCard from "../components/home/DonationCard.vue";
import EducationTab from "../components/home/EducationTab.vue";
import HealthcareTab from "../components/home/HealthcareTab.vue";
import SuccessTab from "../components/home/SuccessStoryTab.vue";
export default {
  components: {
    DonationCard,
    EducationTab,
    HealthcareTab,
    SuccessTab,
  },
  data() {
    return {
      selectedTab: "HealthcareTab",
    };
  },
  methods: {
    selectTab(name) {
      this.selectedTab = name;
    },
  },
};
</script>
