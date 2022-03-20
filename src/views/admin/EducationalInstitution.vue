<template>
  <base-card>
    <div class="d-flex">
      <div class="pe-2">
        <select
          @change="handleRegionFilter($event)"
          class="form-select"
          v-model="regionIdForFilter"
          aria-label="selectFilte"
        >
          <option value=" ">Region</option>
          <option v-for="region in regions" :Key="region.id" :value="region.id">
            {{ region.name }}
          </option>
        </select>
      </div>
      <div class="pe-2">
        <select
          class="form-select"
          @change="handleZoneFilter($event)"
          v-model="zoneIdForFilter"
          aria-label="selectFilterRegion"
        >
          <option value=" ">Zone</option>
          <option v-for="zone in filteredZones" :key="zone.id" :value="zone.id">
            {{ zone.name }}
          </option>
        </select>
      </div>
      <button @click="showAddModal" class="btn ms-auto bg-dark-blue text-light">
        Add New Institution
      </button>
    </div>
    <table class="mt-2">
      <tr>
        <th>No</th>
        <th></th>
        <th>Title</th>
        <th>Region</th>
        <th>Zone</th>
        <th>Added By</th>
        <th><span class="sr-only">Action</span></th>
      </tr>
      <tr
        v-for="(institution, index) in educationalInstitutions"
        :key="institution.id"
      >
        <td>{{ index + 1 }}</td>
        <td>
          <img
            :src="institution.images?.[0]?.path"
            width="150"
            height="100"
            alt="Institution photo"
          />
        </td>
        <td>{{ institution.title }}</td>
        <td>{{ institution.region?.name }}</td>
        <td>{{ institution.zone?.name }}</td>
        <td>
          {{
            institution.posted_by?.first_name +
            " " +
            institution.posted_by?.last_name
          }}
        </td>
        <td
          v-if="
            user.id === institution.posted_by?.id ||
            user.role?.name === 'super_admin'
          "
        >
          <span @click="showDetail(institution)" class="me-2" role="button"
            ><i class="far fa-edit"></i
          ></span>
          <span @click="showDeleteModal(institution)" role="button"
            ><i class="fas fa-trash"></i
          ></span>
        </td>
      </tr>
    </table>
    <div
      v-if="educationalInstitutions.length"
      class="mt-2 d-flex justify-content-end"
    >
      <select
        class="form-contro"
        @change="changePerPage($event)"
        aria-label="per page"
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="20">30</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="200">200</option>
      </select>

      <nav class="mx-3" aria-label="Page navigation">
        <ul class="pagination mb-0">
          <li class="page-item">
            <a
              v-show="currentPage > 1"
              class="page-link"
              @click="navigateTo(currentPage - 1)"
              role="button"
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          <li v-for="n in lastPageNo" :key="n" class="page-item">
            <a
              class="page-link"
              :class="{ 'bg-dark-blue text-light': currentPage === n }"
              role="button"
              @click="navigateTo(n)"
              >{{ n }}</a
            >
          </li>

          <li class="page-item">
            <a
              class="page-link"
              v-show="currentPage + 1 < lastPageNo"
              @click="navigateTo(currentPage + 1)"
              role="button"
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
      <div class="fw-bold mt-2">
        Result {{ currentPage * perPage - perPage + 1 }}-{{
          currentPage * perPage - perPage + educationalInstitutions.length
        }}
        of {{ total }}
      </div>
    </div>
    <p class="text-center" v-if="!educationalInstitutions.length">
      Damaged educational institution not added yet!
    </p>
  </base-card>

  <!-- add institutions -->
  <base-modal :modalState="isAddModalVisible" @close="closeAddModal">
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
      <div class="mb-3" :class="{ warining: v$.institution.region_id.$error }">
        <label for="region" class="form-label">Region</label>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="institution.region_id"
          @blur="v$.institution.region_id.$touch"
        >
          <option v-for="region in regions" :key="region.id" :value="region.id">
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
        <label for="woreda" class="form-label">woreda</label>
        <input
          type="text"
          class="form-control"
          id="woreda"
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
      <multiple-image-upload @saveImage="setImages" />
      <div v-if="images.length" class="progress mt-3">
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
        title="Save"
        :isLoading="isLoading"
        :errorMessage="errorMessage"
        loadingTitle="Saving"
        @submit="addEducationalInstitution"
      />
    </form>
  </base-modal>
  <!--delete modal  -->
  <base-modal :modalState="isDeleteModalVisible" @close="closeDeleteModal">
    <strong class="mt-0 fs-5">Delete</strong>
    <p>Do u want delete {{ institutionForDelete.title }}?</p>
    <base-button
      class="mt-3"
      title="Delete"
      :isLoading="isLoading"
      :errorMessage="errorMessage"
      loadingTitle="Deleting"
      @submit="deleteEducationalInstitution"
    />
  </base-modal>
</template>
<script>
import apiClient from "../../resources/baseUrl";
import useValidate from "@vuelidate/core";
import { required, helpers, maxLength } from "@vuelidate/validators";
import MultipleImageUpload from "../../components/admin/MultipleImageUpload.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    MultipleImageUpload,
  },
  data() {
    return {
      v$: useValidate(),
      educationalInstitutions: [],
      isAddModalVisible: false,
      institutionForDelete: "",
      isDeleteModalVisible: "",
      isLoading: false,
      uploadPercentage: 0,
      errorMessage: "",
      images: [],
      regionIdForFilter: " ",
      zoneIdForFilter: " ",
      institution: {
        title: "",
        type: "Education",
        description: "",
        woreda: "",
        kebele: "",
        zone_id: "",
        region_id: "",
      },
      // pagination
      total: "",
      currentPage: "",
      perPage: "",
      lastPageNo: "",
    };
  },
  computed: {
    ...mapGetters(["regions", "zones", "user"]),
    filteredZonesForAdd() {
      return this.zones.filter((zone) => {
        return zone.region?.id === this.institution.region_id;
      });
    },
    filteredZones() {
      return this.zones.filter((zone) => {
        return zone.region?.id === this.regionIdForFilter;
      });
    },
  },
  methods: {
    handleRegionFilter() {
      this.fetchEducationalInstitutions(10, 1);
    },
    handleZoneFilter() {
      this.fetchEducationalInstitutions(10, 1);
    },
    setImages(images) {
      this.images = [...images];
    },
    showAddModal() {
      this.isAddModalVisible = true;
    },
    showDetail(institution) {
      this.$store.commit("setInstitution", institution);
      this.$router.push({
        name: "InstitutionDetail",
        params: { ...institution },
      });
    },
    closeAddModal() {
      this.isAddModalVisible = false;
      this.v$.$reset();
      this.errorMessage = "";
      this.institution = { type: "Education" };
    },
    showDeleteModal({ ...institution }) {
      this.isDeleteModalVisible = true;
      this.institutionForDelete = institution;
    },
    closeDeleteModal() {
      this.isDeleteModalVisible = false;
      this.errorMessage = "";
      this.isLoading = false;
      this.institutionForDelete = {};
    },
    async addEducationalInstitution() {
      this.errorMessage = "";
      this.v$.$validate();
      if (!this.v$.$error) {
        this.isLoading = true;
        var fd = new FormData();
        this.images.forEach((image, i) => {
          fd.append(`images[${i}]`, image);
        });
        for (const attr in this.institution) {
          fd.append(attr, this.institution[attr]);
        }
        try {
          const response = await apiClient.post("/api/posts", fd, {
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
            this.educationalInstitutions.push(response.data);
            this.closeAddModal();
          } else throw "";
        } catch (e) {
          this.errorMessage = "Failed to add damaged institution info";
        } finally {
          this.isLoading = false;
          this.uploadPercentage = 0;
          this.images = [];
        }
      }
    },
    async deleteEducationalInstitution() {
      this.errorMessage = "";
      this.isLoading = true;
      try {
        const response = await apiClient.delete(
          `/api/posts/${this.institutionForDelete.id}`
        );
        if (response.status === 200) {
          const deletedIndex = this.educationalInstitutions.findIndex(
            (institution) => {
              return institution.id === this.institutionForDelete.id;
            }
          );
          this.educationalInstitutions.splice(deletedIndex, 1);
          this.closeDeleteModal();
        }
      } catch (e) {
        this.errorMessage = "Failed to delete institution";
      } finally {
        this.isLoading = false;
      }
    },
    navigateTo(pageNo) {
      if (pageNo <= 1 || pageNo >= this.lastPageNo) {
        return;
      }
      this.fetchEducationalInstitutions(10, pageNo);
    },
    changePerPage(e) {
      this.fetchEducationalInstitutions(e.target.value, 1);
    },
    async fetchEducationalInstitutions(perPage, pageNo) {
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get(
          `/api/posts?type=education&&per_page=${perPage}&&page_no=${pageNo}&&region=${this.regionIdForFilter}&&zone=${this.zoneIdForFilter}`
        );
        if (response.status === 200) {
          this.educationalInstitutions = response.data.data;
          this.total = response.data.meta.total;
          this.currentPage = response.data.meta.current_page;
          this.perPage = response.data.meta.per_page;
          this.lastPageNo = response.data.meta.last_page;
        }
      } catch (e) {
        //
      } finally {
        this.$store.commit("setIsLoading", false);
      }
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
            "woreda should not be greater than 50 characters",
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

  created() {
    this.fetchEducationalInstitutions(10, 1);
  },
};
</script>
