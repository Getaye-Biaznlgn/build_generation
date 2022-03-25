<template>
  <success-story-item
    v-for="item in stories"
    :key="item.id"
    :news="item"
    :index="index"
    class="mt-4"
  />
  <!-- pagination -->
  <div v-if="stories.length" class="mt-2 d-flex justify-content-end">
    <select
      class="form-contro"
      @change="changePerPage($event)"
      aria-label="per page"
    >
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="20">30</option>
      <option value="50">50</option>
      <option value="100">100</option>
      <option value="200">200</option>
    </select>

    <nav class="mx-3" aria-label="Page navigation">
      <ul class="pagination mb-0">
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

        <li v-for="n in lastPageNo" :key="n" class="page-item">
          <a
            class="page-link"
            :class="{ 'bg-dark-blue text-light': currentPage === n }"
            role="button"
            @click="navigateTo(n)"
            >{{ n }}</a
          >
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
    <div class="fw-bold mt-2">
      Result {{ currentPage * perPage - perPage + 1 }}-{{
        currentPage * perPage - perPage + stories.length
      }}
      of {{ total }}
    </div>
  </div>
  <p class="text-center text-capitalize" v-if="!stories.length">
    News or success story is not added yet!
  </p>
</template>

<script>
import apiClient from "../resources/baseUrl";
import SuccessStoryItem from "../components/SuccessStoryItem.vue";
export default {
  emits: {
    showShareModal() {
      return true;
    },
  },
  components: {
    SuccessStoryItem,
  },
  data() {
    return {
      stories: [],

      // pagination
      total: "",
      currentPage: "",
      perPage: "",
      lastPageNo: "",
    };
  },
  methods: {
    navigateTo(pageNo) {
      if (pageNo <= 1 || pageNo >= this.lastPageNo) {
        return;
      }
      this.fetchNews(10, pageNo);
    },
    changePerPage(e) {
      this.fetchNews(e.target.value, 1);
    },

    async fetchNews(perPage, pageNo) {
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get(
          `/api/user_news?per_page=${perPage}&&page_no=${pageNo}`
        );
        if (response.status === 200) {
          this.stories = response.data.data;
        }
      } catch (e) {
        //
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
  },
  created() {
    this.fetchNews(10, 1);
  },
};
</script>

<style>
.bg-dark-blue {
  background-color: #2f4587;
}
</style>
