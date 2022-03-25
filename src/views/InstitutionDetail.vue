<template>
  <div class="container px-0 my-2">
    <div class="d-none d-lg-block my-3">
      <strong class="text-capitalize">{{
        `${institution.title} in ${institution.region?.name} Region, ${institution.zone?.name} Zone`
      }}</strong>
      <strong v-if="institution.woreda">{{
        `, ${institution.woreda} woreda`
      }}</strong>
      <strong v-if="institution.kebele">{{
        `, ${institution.kebele} kebele/ Town`
      }}</strong>
    </div>
    <div class="row">
      <div class="col-lg-8">
        <transition name="fade" appear mode="in-out">
          <img
            :src="selectedImage"
            :alt="selectedImage"
            class="img-fluid image-view rounded rounded"
          />
        </transition>
        <div class="image-preview d-flex my-2">
          <img
            @click="showImage(image.path)"
            :src="image.path"
            width="50"
            height="40"
            class="me-3 mb-2 rounded"
            role="button"
            v-for="image in institution.images"
            :key="image.id"
            alt=""
          />
        </div>
      </div>
      <div class="d-block d-lg-none text-center my-3">
        <strong class="text-capitalize">{{
          `${institution.title} in ${institution.region?.name} Region, ${institution.zone?.name} Zone`
        }}</strong>
        <strong class="text-capitalize" v-if="institution.woreda">{{
          `, ${institution.woreda} woreda`
        }}</strong>
        <strong class="text-capitalize" v-if="institution.kebele">{{
          `, ${institution.kebele} kebele/ Town`
        }}</strong>
      </div>
      <div class="col-lg-4 my-4 pt-lg-4 mt-lg-0">
        <div class="d-grid gap-2">
          <button
            @click="showShareModal"
            class="btn btn-light-warning fw-bold"
            type="button"
          >
            Share
          </button>
          <button
            @click="this.$router.push({ name: 'Payments' })"
            class="btn btn-warning fw-bold"
            type="button"
          >
            Donate Now
          </button>
        </div>
      </div>
    </div>
    <p class="fw-bold text-capitalize">
      Location:
      <strong class="text-capitalize">{{
        `${institution.region?.name} Region, ${institution.zone?.name} Zone`
      }}</strong>
      <strong class="text-capitalize" v-if="institution.woreda">{{
        `, ${institution.woreda} woreda`
      }}</strong>
      <strong class="text-capitalize" v-if="institution.kebele">{{
        `, ${institution.kebele} kebele/ Town`
      }}</strong>
    </p>
    <p>
      {{ institution.description }}
    </p>
  </div>
</template>

<script>
import apiClient from "../resources/baseUrl";
export default {
  props: ["id"],
  data() {
    return {
      selectedImage: " ",
      institution: {},
    };
  },
  methods: {
    showShareModal() {
      this.$emit("showShareModal");
    },
    closeShareModal() {
      this.isShareVisible = false;
    },
    showImage(img) {
      this.selectedImage = img;
    },
    async fetchInstitutionDetail() {
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get("/api/user_posts/" + this.id);
        if (response.status === 200) {
          this.institution = response.data;
          this.selectedImage = this.institution.images?.[0]?.path;
        }
      } catch (e) {
        //
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
  },
  created() {
    this.fetchInstitutionDetail();
  },
};
</script>

<style scoped>
.image-preview {
  width: 100%;
  /* height: 400px; */
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

.fade-enter-from {
  opacity: 0;
  transform: translateY(300);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 5s;
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(100);
}
</style>
