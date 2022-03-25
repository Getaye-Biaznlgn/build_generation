<template>
  <base-card>
    <span
      @click="$router.back()"
      role="button"
      class="text-dark-blue pe-2 fw-bold fs-5"
      ><i class="fas fa-arrow-left"></i>Back</span
    >
    <div
      class="rounded border col-md-6 border-secondary p-3 m-2 d-block mx-auto"
    >
      <form @submit.prevent>
        <div class="mb-3" :class="{ warining: v$.institution.title.$error }">
          <label for="title" class="form-label">Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            v-model.trim="institution.title"
            @blur="v$.institution.title.$touch"
          />
          <span
            class="error-msg mt-1"
            v-for="(error, index) of v$.institution.title.$errors"
            :key="index"
          >
            {{ error.$message + ", " }}</span
          >
        </div>
        <div
          class="mb-3"
          :class="{ warining: v$.institution.description.$error }"
        >
          <label for="description" class="form-label">Description</label>
          <textarea
            type="text"
            class="form-control"
            id="description"
            rows="5"
            v-model.trim="institution.description"
            @blur="v$.institution.description.$touch"
          />
          <span
            class="error-msg mt-1"
            v-for="(error, index) of v$.institution.description.$errors"
            :key="index"
            >{{ error.$message + ", " }}</span
          >
        </div>
        <div
          class="mb-3"
          :class="{ warining: v$.institution.region_id.$error }"
        >
          <label for="region" class="form-label"
            >Region{{ institution.region?.id }}</label
          >
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="institution.region_id"
            @blur="v$.institution.region_id.$touch"
          >
            <option
              v-for="region in regions"
              :key="region.id"
              :value="region.id"
            >
              {{ region.name }}
            </option>
          </select>
          <span
            class="error-msg mt-1"
            v-for="(error, index) of v$.institution.region_id.$errors"
            :key="index"
            >{{ error.$message + ", " }}</span
          >
        </div>
        <div class="mb-3" :class="{ warining: v$.institution.zone_id.$error }">
          <label for="zone" class="form-label">Zone</label>
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="institution.zone_id"
            @blur="v$.institution.zone_id.$touch"
          >
            <option
              v-for="zone in filteredZonesForAdd"
              :key="zone.id"
              :value="zone.id"
            >
              {{ zone.name }}
            </option>
          </select>
          <span
            class="error-msg mt-1"
            v-for="(error, index) of v$.institution.zone_id.$errors"
            :key="index"
            >{{ error.$message + ", " }}</span
          >
        </div>

        <div class="mb-3" :class="{ warining: v$.institution.woreda.$error }">
          <label for="Woreda" class="form-label">Woreda</label>
          <input
            type="text"
            class="form-control"
            id="Woreda"
            v-model.trim="institution.woreda"
            @blur="v$.institution.woreda.$touch"
          />
          <span
            class="error-msg mt-1"
            v-for="(error, index) of v$.institution.woreda.$errors"
            :key="index"
            >{{ error.$message + ", " }}</span
          >
        </div>
        <div class="mb-3" :class="{ warining: v$.institution.kebele.$error }">
          <label for="kebele" class="form-label">kebele</label>
          <input
            type="text"
            class="form-control"
            id="kebele"
            v-model.trim="institution.kebele"
            @blur="v$.institution.kebele.$touch"
          />
          <span
            class="error-msg mt-1"
            v-for="(error, index) of v$.institution.kebele.$errors"
            :key="index"
            >{{ error.$message + ", " }}</span
          >
        </div>
        <base-button
          class="mt-3"
          title="Save changes"
          :isLoading="isLoading"
          loadingTitle="Saving"
          @submit="updateInstitutionInfo"
        />
      </form>
    </div>
  </base-card>
  <!-- image view components -->
  <base-card>
    <div class="row g-4 p-3">
      <div
        v-for="img in institution.images"
        :key="img.id"
        class="col-lg-3 col-md-4 col-sm-6 position-relative img-content"
      >
        <img :src="img.path" alt="" width="200" height="200" class="rounded" />
        <div class="position-absolute img-overly start-0 top-0 h-100 w-100">
          <span
            role="button"
            @click="showDeleteModal(img)"
            class="position-absolute start-50 ms-5"
            ><i class="fas fa-times fw-bold fs-3"></i
          ></span>
        </div>
      </div>
      <div v-if="!institution.images?.length" class="mt-2 text-center">
        Images isn't uploaded yet!
      </div>
    </div>
  </base-card>
  <!-- add new Image -->
  <base-card>
    <multiple-image-upload @saveImage="setNewImages" />
    <div v-if="newImages.length" class="progress mt-3">
      <div
        class="progress-bar btn-add"
        role="progressbar"
        :style="{ width: uploadPercentage + '%' }"
        id="progress"
        :aria-valuenow="p"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
    <base-button
      class="mt-3"
      title="Upload"
      :isLoading="isImageUploading"
      loadingTitle="Uploading"
      @submit="uploadNewImages"
    />
  </base-card>

  <!-- delete base modal -->
  <base-modal :modalState="isDeleteModalVisible" @close="closeDeleteModal">
    <strong class="mt-0 fs-5">Delete</strong>
    <p>Do u want delete?</p>
    <img
      :src="image?.path"
      width="200"
      height="200"
      class="d-block mx-auto"
      alt="Selected image"
    />
    <base-button
      class="mt-3"
      title="Delete"
      :isLoading="isLoading"
      :errorMessage="errorMessage"
      loadingTitle="Deleting"
      @submit="deleteImage"
    />
  </base-modal>

  <!-- alert  -->
  <the-alert
    :isVisible="isAlertVisible"
    :message="alertMessage"
    :isSucceed="isRequestSucceed"
  />
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, helpers, maxLength } from "@vuelidate/validators";
import { mapGetters } from "vuex";
import apiClient from "../../resources/baseUrl";
import MultipleImageUpload from "../../components/admin/MultipleImageUpload.vue";
import TheAlert from "../../components/admin/TheAlert.vue";
export default {
  components: {
    MultipleImageUpload,
    TheAlert,
  },
  props: ["institute"],
  data() {
    return {
      v$: useValidate(),
      institution: {},
      isLoading: false,
      isImageUploading: false,
      isImageDeleting: false,
      uploadPercentage: "",
      errorMessage: "",
      newImages: [],
      deleteImageMessage: "",
      image: "",
      isDeleteModalVisible: false,
      // alert
      alertMessage: "",
      isRequestSucceed: "",
      isAlertVisible: "",
      timeout: null,
    };
  },
  computed: {
    ...mapGetters(["regions", "zones"]),
    filteredZonesForAdd() {
      return this.zones.filter((zone) => {
        return zone.region?.id === this.institution.region_id;
      });
    },
    institutionDetail() {
      return this.$store.getters.institution;
    },
  },
  methods: {
    setNewImages(images) {
      this.newImages = images;
    },
    dismissAlert() {
      this.timeout = setTimeout(() => {
        this.isAlertVisible = false;
        this.uploadPercentage = 0;
      }, 3000);
    },
    async uploadNewImages() {
      this.isImageUploading = true;
      var fd = new FormData();
      this.newImages.forEach((image, i) => {
        fd.append(`images[${i}]`, image);
      });
      fd.append("post_id", this.institution.id);
      try {
        const response = await apiClient.post("/api/update_images", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        });
        if (response.status === 201) {
          this.institution.images.push(...response.data);
          this.isAlertVisible = true;
          this.alertMessage = "Images has been uploaded successfully!";
          this.isRequestSucceed = true;
          this.newImages = [];
        } else throw "";
      } catch (e) {
        this.isAlertVisible = true;
        this.alertMessage = "Failed to upload images";
        this.isRequestSucceed = false;
      } finally {
        this.isImageUploading = false;

        this.dismissAlert();
      }
    },
    async updateInstitutionInfo() {
      this.errorMessage = "";
      this.isLoading = true;
      try {
        const response = await apiClient.put(
          "/api/posts/" + this.institution.id,
          {
            title: this.institution.title,
            description: this.institution.description,
            zone_id: this.institution.zone_id,
            woreda: this.institution.woreda,
            kebele: this.institution.kebele,
            type: this.institution.type,
          }
        );
        if (response.status === 200) {
          this.isAlertVisible = true;
          this.alertMessage = "Institution info has been updated successfully!";
          this.isRequestSucceed = true;
        } else throw "";
      } catch (e) {
        this.isAlertVisible = true;
        this.alertMessage = "Failed to update damaged Institution info";
        this.isRequestSucceed = false;
      } finally {
        this.isLoading = false;
        this.dismissAlert();
      }
    },
    async deleteImage() {
      this.errorMessage = "";
      this.isLoading = true;
      try {
        const response = await apiClient.delete(
          `/api/delete_image/${this.image.id}`
        );
        if (response.status === 200) {
          const deletedIndex = this.institution.images?.findIndex((image) => {
            return image.id === this.image.id;
          });
          this.institution.images.splice(deletedIndex, 1);
          this.closeDeleteModal();
        }
      } catch (e) {
        this.errorMessage = "Failed to delete";
      } finally {
        this.isLoading = false;
      }
    },
    closeDeleteModal() {
      this.errorMessage = "";
      this.isDeleteModalVisible = false;
      this.image = {};
    },
    showDeleteModal({ ...image }) {
      this.isDeleteModalVisible = true;
      this.image = image;
    },
  },
  beforeUnmount() {
    clearTimeout(this.timeout);
  },
  created() {
    this.institution = {
      ...this.institutionDetail,
      region_id: this.institutionDetail?.region?.id,
      zone_id: this.institutionDetail?.zone?.id,
    };
  },
  watch: {
    institutionDetail() {
      this.institution = { ...this.institutionDetail };
    },
  },
  validations() {
    return {
      institution: {
        title: {
          required,
          max: helpers.withMessage(
            "Title should not be greater than 50 characters",
            maxLength(50)
          ),
        },
        description: {
          required,
        },
        woreda: {
          max: helpers.withMessage(
            "Woreda should not be greater than 50 characters",
            maxLength(50)
          ),
        },
        kebele: {
          max: helpers.withMessage(
            "Kebele should not be greater than 50 characters",
            maxLength(50)
          ),
        },
        zone_id: {
          required,
        },
        region_id: {
          required,
        },
      },
    };
  },
};
</script>

<style scoped>
.img-overly {
  display: none;
  background-color: rgba(255, 255, 255, 0.6);
}
.img-content:hover .img-overly {
  display: block;
}
.img-content {
  z-index: 0;
}
</style>
>
