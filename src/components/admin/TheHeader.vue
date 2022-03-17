<template>
  <nav class="d-flex shadow-sm justify-content-between py-2 px-3">
    <div>
      <strong class="fs-4">Build Generation</strong>
    </div>
    <div class="fs-5">{{ user.first_name + " " + user.last_name }}</div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>
