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
        <div class="mb-3" :class="{ warining: v$.news.title.$error }">
          <label for="title" class="form-label">Title</label>
          <input
            :disabled="user.role?.name !== 'super_admin'"
            type="text"
            class="form-control"
            id="title"
            v-model.trim="news.title"
            @blur="v$.news.title.$touch"
          />
          <span
            class="error-msg mt-1"
            v-for="(error, index) of v$.news.title.$errors"
            :key="index"
          >
            {{ error.$message + ", " }}</span
          >
        </div>
        <div class="mb-3" :class="{ warining: v$.news.description.$error }">
          <label for="description" class="form-label">Description</label>
          <textarea
            :disabled="user.role?.name !== 'super_admin'"
            type="text"
            class="form-control"
            id="description"
            rows="5"
            v-model.trim="news.description"
            @blur="v$.news.description.$touch"
          />
          <span
            class="error-msg mt-1"
            v-for="(error, index) of v$.news.description.$errors"
            :key="index"
            >{{ error.$message + ", " }}</span
          >
        </div>

        <base-button
          v-if="user.role?.name === 'super_admin'"
          class="mt-3"
          title="Save changes"
          :isLoading="isLoading"
          loadingTitle="Saving"
          @submit="updateNewsInfo"
        />
      </form>
    </div>
  </base-card>
  <!-- image view components -->
  <base-card>
    <div class="row g-4 p-3">
      <div
        v-for="img in news.images"
        :key="img.id"
        class="col-lg-3 col-md-4 col-sm-6 position-relative img-content"
      >
        <img :src="img.path" alt="" width="200" height="200" class="rounded" />
        <div
          v-if="user.role?.name === 'super_admin'"
          class="position-absolute img-overly start-0 top-0 h-100 w-100"
        >
          <span
            role="button"
            @click="showDeleteModal(img)"
            class="position-absolute start-50 ms-5"
            ><i class="fas fa-times fw-bold fs-3"></i
          ></span>
        </div>
      </div>
      <div v-if="!news.images?.length" class="mt-2 text-center">
        Images isn't uploaded yet!
      </div>
    </div>
  </base-card>
  <!-- add new Image -->
  <base-card v-if="user.role?.name === 'super_admin'">
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
      news: {},
      isLoading: false,
      isImageUploading: false,
      isImageDeleting: false,
      uploadPercentage: 0,
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
    newsDetail() {
      return this.$store.getters.institution;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    setNewImages(images) {
      this.newImages = images;
      // console.log("images---", this.newImages);
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
      fd.append("news_id", this.news.id);
      try {
        const response = await apiClient.post("/api/update_news_images", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
          onUploadProgress: function (progressEvent) {
            this.uploadPercentage = parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            );
          }.bind(this),
        });
        if (response.status === 201) {
          this.news.images.push(...response.data);
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
    async updateNewsInfo() {
      this.errorMessage = "";
      this.isLoading = true;
      try {
        const response = await apiClient.put("/api/news/" + this.news.id, {
          title: this.news.title,
          description: this.news.description,
        });
        if (response.status === 200) {
          this.isAlertVisible = true;
          this.alertMessage = "news info has been updated successfully!";
          this.isRequestSucceed = true;
        } else throw "";
      } catch (e) {
        this.isAlertVisible = true;
        this.alertMessage = "Failed to update  news info";
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
          `/api/delete_news_image/${this.image.id}`
        );
        if (response.status === 200) {
          const deletedIndex = this.news.images?.findIndex((image) => {
            return image.id === this.image.id;
          });
          this.news.images.splice(deletedIndex, 1);
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
    //to set params value
    // this.news = { ...this.institute };

    this.news = { ...this.newsDetail };
  },
  watch: {
    newsDetail() {
      this.news = { ...this.newsDetail };
    },
  },
  validations() {
    return {
      news: {
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
