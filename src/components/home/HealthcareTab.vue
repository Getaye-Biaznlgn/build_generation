<template>
  <institution-item
    v-for="(item, index) in healthcareInstitutions"
    :institution="item"
    :index="index"
    :key="item.id"
  />
</template>

<script>
import InstitutionItem from "../InstitutionItem.vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default {
  props: ["healthcareInstitutions"],
  components: {
    InstitutionItem,
  },
};
</script>
