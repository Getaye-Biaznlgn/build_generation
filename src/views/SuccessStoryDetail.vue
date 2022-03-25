<template>
  <div class="container px-0 my-2">
    <div class="d-none d-lg-block my-3">
      <strong class="text-capitalize">{{ news.title }}</strong>
    </div>
    <div>
      <fade-transition>
        <img
          :src="selectedImage"
          :alt="selectedImage"
          class="img-fluid image-view rounded rounded"
        />
      </fade-transition>
      <div class="image-preview d-flex my-2">
        <img
          @click="showImage(image.path)"
          :src="image.path"
          width="50"
          height="40"
          class="me-3 mb-2 rounded"
          role="button"
          v-for="image in news.images"
          :key="image.id"
          alt=""
        />
      </div>
    </div>
    <div class="d-block d-lg-none text-center my-3">
      <strong class="text-capitalize">{{ news.title }}</strong>
    </div>
    <p>
      {{ news.description }}
    </p>
  </div>
</template>

<script>
import apiClient from "../resources/baseUrl";
import FadeTransition from "../components/FadeTransition.vue";
export default {
  components: {
    FadeTransition,
  },
  props: ["id"],
  data() {
    return {
      selectedImage: " ",
      news: {},
    };
  },
  methods: {
    showImage(img) {
      this.selectedImage = img;
    },
    async fetchNewsDetail() {
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get("/api/user_news/" + this.id);
        if (response.status === 200) {
          this.news = response.data;
          this.selectedImage = this.news.images?.[0]?.path;
        }
      } catch (e) {
        //
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
  },
  created() {
    this.fetchNewsDetail();
  },
};
</script>

<style scoped>
.image-preview {
  width: 100%;
  overflow-x: auto;
}
.btn-light-warning {
  background-color: rgba(255, 193, 7, 0.486);
}
@media (min-width: 801px) {
  .image-view {
    height: 50vh;
  }
}
</style>
