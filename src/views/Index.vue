<template>
  <div class="position-relative">
    <div
      v-if="isLoading"
      class="route-loading p-0 position-fixed top-0 start-0 bottom-0 end-0 w-100 h-100"
    >
      <div class="loading-spinner">
        <img src="../assets/loader.gif" alt="slow connection" />
      </div>
    </div>
  </div>
  <div class="container-md">
    <the-header @showShareModal="showShareModal" />
    <router-view @showShareModal="showShareModal" />
  </div>
  <hr />
  <the-footer />
  <social-share
    :isSocialShareVisible="isShareVisible"
    @close="closeShareModal"
  />
</template>

<script>
import TheFooter from "../components/TheFooter.vue";
import TheHeader from "../components/TheHeader.vue";
import SocialShare from "../components/SocialShare.vue";
export default {
  components: {
    TheHeader,
    TheFooter,
    SocialShare,
  },
  data() {
    return {
      isShareVisible: "",
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  methods: {
    showShareModal() {
      this.isShareVisible = true;
    },
    closeShareModal() {
      this.isShareVisible = false;
    },
  },
};
</script>
<style scoped>
.route-loading {
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.sidebar {
  background-color: #ecf1fe;
  min-height: 100vh;
  width: 20% !important;
}
.loading-spinner {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* z-index: 1; */
}
</style>
