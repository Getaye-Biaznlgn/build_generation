<template>
  <institution-item
    v-for="(item, index) in educationalInstitutions"
    :key="item.id"
    :institution="item"
    :index="index"
  />
</template>

<script>
import InstitutionItem from "../InstitutionItem.vue";
export default {
  props: ["educationalInstitutions"],
  components: {
    InstitutionItem,
  },
};
</script>

<style></style>
