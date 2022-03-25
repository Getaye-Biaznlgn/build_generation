<template>
  <div class="p-3 shadow-lg bg-white rounded">
    <div class="small fw-bold">${{ totalDonation.total_money }} USD Raised</div>
    <hr class="my-2" />
    <div class="small mb-3">{{ totalDonation.total_user }} donors</div>
    <div class="d-grid gap-2">
      <button
        @click="$emit('showSocialShare')"
        class="btn btn-light-warning fw-bold"
        type="button"
      >
        {{ $t("btn.share", $store.state.lang) }}
      </button>
      <button
        @click="this.$router.push({ name: 'Payments' })"
        class="btn btn-warning fw-bold"
        type="button"
      >
        {{ $t("btn.donateNow", $store.state.lang) }}
      </button>
    </div>
    <ul class="navbar-nav my-3">
      <li class="nav-item" v-for="donor in donors" :key="donor.id">
        <div class="d-flex">
          <span class="fs-3 pe-3 pt-1">
            <i class="fas fa-user-circle"></i>
          </span>
          <div>
            <div class="text-capilalize">
              <span v-if="donor.is_visible">{{ donor.full_name }}</span
              ><span v-else>Anonymous</span>
            </div>
            <span class="small"
              >{{ `$${donor.donation_amount}  ${donor.created_at}` }}
            </span>
          </div>
        </div>
        <hr class="my-2" />
      </li>
    </ul>
    <div class="d-flex justify-content-between">
      <button
        @click="
          this.$router.push({ name: 'TheDonations', params: { type: 'all' } })
        "
        class="btn text-success fw-bold border"
      >
        {{ $t("btn.seeAll", $store.state.lang) }}
      </button>
      <button
        class="btn border fw-bold"
        @click="
          this.$router.push({ name: 'TheDonations', params: { type: 'top' } })
        "
      >
        <i class="fa fa-star-o" aria-hidden="true"></i>
        {{ $t("btn.seeTopDonation", $store.state.lang) }}
      </button>
    </div>
  </div>
</template>

<script>
import apiClient from "../../resources/baseUrl";
export default {
  emits: {
    showSocialShare() {
      return true;
    },
  },
  data() {
    return {
      donors: [],
      totalDonation: {},
    };
  },
  methods: {
    async fetchDonors() {
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get(
          `/api/user_donation?per_page=3&&page_no=1`
        );
        if (response.status === 200) {
          this.donors = response.data.data;
        }
      } catch (e) {
        //
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
    async fetchTotalDonation() {
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get("/api/total_donation");
        if (response.status === 200) {
          this.totalDonation = response.data;
        }
      } catch (e) {
        //
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
  },
  created() {
    this.fetchDonors();
    this.fetchTotalDonation();
  },
};
</script>

<style>
.btn-light-warning {
  background-color: rgba(255, 193, 7, 0.486);
}
</style>
