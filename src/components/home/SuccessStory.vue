<template>
  <div class="container" v-if="stories.length">
    <div class="d-flex justify-content-between my-3">
      <div class="fw-bold fs-5">Success Stories</div>
      <button @click="seeAll" class="btn btn-warning">
        {{ $t("btn.seeAll", $store.state.lang) }}
      </button>
    </div>
    <success-story-item
      v-for="(item, index) in stories"
      :key="item.id"
      :index="index"
      :news="item"
    />
  </div>
</template>

<script>
import SuccessStoryItem from "../SuccessStoryItem.vue";
import apiClient from "../../resources/baseUrl";
export default {
  components: {
    SuccessStoryItem,
  },
  data() {
    return {
      stories: [],
    };
  },
  methods: {
    seeAll() {
      this.$router.push({ name: "UserSuccessStory" });
    },
    async fetchStories() {
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get(
          `/api/user_news?per_page=3&&page_no=1`
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
    this.fetchStories();
  },
};
</script>
