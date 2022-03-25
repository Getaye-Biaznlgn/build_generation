<template>
  <div class="container d-lg-flex justify-content-between my-3">
    <div
      class="p-3 order-2 shadow-lg bg-white rounded flex-fill words-support-card"
    >
      <div class="small fw-bold">
        ${{ totalDonation.total_money }} USD Raised
      </div>
      <hr class="my-2" />
      <div class="small mb-3">{{ totalDonation.total_user }} donors</div>
      <div class="d-grid gap-2">
        <button class="btn btn-light-warning fw-bold" type="button">
          Share
        </button>
        <button
          @click="this.$router.push({ name: 'Payments' })"
          class="btn btn-warning fw-bold"
          type="button"
        >
          Donate Now
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
      <nav class="mx-3" aria-label="Page navigation">
        <ul class="pagination mb-0 d-flex justify-content-between">
          <li class="page-item">
            <a
              v-show="currentPage > 1"
              class="page-link"
              @click="navigateTo(currentPage - 1)"
              role="button"
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          <li class="page-item">
            <a
              class="page-link"
              v-show="currentPage + 1 < lastPageNo"
              @click="navigateTo(currentPage + 1)"
              role="button"
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <!-- words of support -->
    <div class="order-1 flex-fill words-support-card mt-3 mt-lg-0">
      <strong class="d-block fs-5 my-2">Words of support</strong>
      <div class="d-flex mb-4" v-for="word in wordsOfSupport" :key="word.id">
        <span class="fs-3 pe-3">
          <i class="fas fa-user-circle"></i>
        </span>
        <div>
          <div class="text-capilalize">
            <span v-if="word.is_visible" class="fw-bold">{{
              word.full_name
            }}</span>
            <span v-else>Anonymous</span>
          </div>
          <span>{{ word.word_of_support }}</span>
        </div>
      </div>
      <nav class="mx-3" aria-label="Page navigation">
        <ul class="pagination mb-0 d-flex justify-content-between">
          <li class="page-item">
            <a
              v-show="wordCurrentPage > 1"
              class="page-link"
              @click="wordNavigateTo(wordCurrentPage - 1)"
              role="button"
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          <li class="page-item">
            <a
              class="page-link"
              v-show="wordCurrentPage + 1 < wordLastPageNo"
              @click="wordNavigateTo(wordCurrentPage + 1)"
              role="button"
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import apiClient from "../resources/baseUrl";
export default {
  props: ["type"],
  data() {
    return {
      totalDonation: {},
      donors: [],
      wordsOfSupport: [],
      //for donors
      currentPage: "",
      lastPageNo: "",
      //for word of support
      wordsCurrentPage: "",
      wordsPageNo: "",
    };
  },
  methods: {
    navigateTo(pageNo) {
      this.fetchDonors(pageNo);
    },
    wordNavigateTo(pageNo) {
      this.fetchWordsOfSupport(pageNo);
    },
    async fetchDonors(page_no) {
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get(
          `/api/user_donation?per_page=10&&page_no=${page_no}?type=${this.type}`
        );
        if (response.status === 200) {
          this.donors = response.data.data;
          this.currentPage = response.data.page_no;
          this.lastPageNo = response.data.last_page;
        }
      } catch (e) {
        //
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
    async fetchWordsOfSupport(page_no) {
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get(
          `/api/words?per_page=10&&page_no=${page_no}`
        );
        if (response.status === 200) {
          this.wordsOfSupport = response.data.data;
          this.wordsCurrentPage = response.data.page_no;
          this.wordsPageNo = response.data.last_page;
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
    this.fetchDonors(1);
    this.fetchTotalDonation();
    this.fetchWordsOfSupport(1);
  },
};
</script>

<style scoped>
.btn-light-warning {
  background-color: rgba(255, 193, 7, 0.486);
}
.words-support-card {
  max-height: 100vh !important;
  overflow-y: auto;
}
</style>
