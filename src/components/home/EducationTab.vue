<template>
  <education-item v-for="n in 3" :key="n" />
</template>

<script>
import EducationItem from "../EducationItem.vue";
export default {
  components: {
    EducationItem,
  },
};
</script>

<style></style>
