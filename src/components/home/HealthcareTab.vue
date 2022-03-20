<template>
  <Healthcare-item v-for="n in 3" :key="n" />
</template>

<script>
import HealthcareItem from "../HealthcareItem.vue";
export default {
  components: {
    HealthcareItem,
  },
};
</script>

<style></style>
