<template>
  <div class="container">
    <div class="d-flex justify-content-between my-3">
      <div class="fw-bold fs-5">Success Stories</div>
      <button class="btn btn-warning">See All</button>
    </div>
    <success-story-item v-for="n in 3" :key="n" />
  </div>
</template>

<script>
import SuccessStoryItem from "../SuccessStoryItem.vue";
export default {
  components: {
    SuccessStoryItem,
  },
};
</script>

<style></style>
