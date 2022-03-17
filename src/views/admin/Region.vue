<template>
  <base-card>
    <button
      v-if="user.role?.name === 'super_admin'"
      @click="showModal"
      class="btn ms-auto d-block bg-dark-blue text-light"
    >
      Add New Region
    </button>
    <table class="mt-2">
      <tr>
        <th>No</th>
        <th>Name</th>
        <th>Damaged Info</th>
        <th><span class="sr-only">Action</span></th>
      </tr>
      <tr v-for="(r, i) in regions" :key="r.id">
        <td>{{ i + 1 }}</td>
        <td>{{ r?.name }}</td>
        <td>{{ r.damaged_info.slice(0, 50) }}...</td>
        <td>
          <span @click="showEditModal(r)" class="me-2" role="button"
            ><i v-if="user.role?.name === 'super_admin'" class="far fa-edit"></i
            ><i v-else class="fas fa-ellipsis-h"></i
          ></span>

          <span
            v-if="user.role?.name === 'super_admin'"
            @click="showDeleteModal(r)"
            role="button"
            ><i class="fas fa-trash"></i
          ></span>
        </td>
      </tr>
    </table>
    <p class="text-center" v-if="!regions.length">Region wasn't aded yet!</p>
  </base-card>

  <!-- add regions -->
  <base-modal :modalState="isAddModalVisible" @close="closeAddModal">
    <form @submit.prevent>
      <div class="mb-3" :class="{ warining: v$.region.name.$error }">
        <label for="name" class="form-label">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          :disabled="user.role?.name !== 'super_admin'"
          v-model.trim="region.name"
          @blur="v$.region.name.$touch"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.region.name.$errors"
          :key="index"
        >
          {{ error.$message + ", " }}</span
        >
      </div>
      <div class="mb-3" :class="{ warining: v$.region.damaged_info.$error }">
        <label for="damaged_info" class="form-label"
          >Description of damage</label
        >
        <textarea
          type="text"
          class="form-control"
          id="damaged_info"
          rows="5"
          :disabled="user.role?.name !== 'super_admin'"
          v-model.trim="region.damaged_info"
          @blur="v$.region.damaged_info.$touch"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.region.damaged_info.$errors"
          :key="index"
          >{{ error.$message + ", " }}</span
        >
      </div>

      <base-button
        v-if="addModalUsedFor === 'add'"
        title="Save"
        :isLoading="isLoading"
        :errorMessage="errorMessage"
        loadingTitle="Saving"
        @submit="addRegion"
      />

      <base-button
        v-if="addModalUsedFor === 'edit' && user.role?.name === 'super_admin'"
        title="Save changes"
        :isLoading="isLoading"
        :errorMessage="errorMessage"
        loadingTitle="Saving"
        @submit="updateRegion"
      />
    </form>
  </base-modal>

  <!--delete modal  -->
  <base-modal :modalState="isDeleteModalVisible" @close="closeDeleteModal">
    <strong class="mt-0 fs-5">Delete</strong>
    <p>Do u want delete region {{ regionForDelete?.name }} ?</p>
    <base-button
      class="mt-3"
      title="Delete"
      :isLoading="isLoading"
      :errorMessage="errorMessage"
      loadingTitle="Deleting"
      @submit="deleteRegion"
    />
  </base-modal>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, helpers, maxLength } from "@vuelidate/validators";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      v$: useValidate(),
      isAddModalVisible: "",
      isDeleteModalVisible: "",
      isLoading: false,
      errorMessage: "",
      regionForDelete: "",
      // i used add modal for add and update
      addModalUsedFor: "add",
      region: {
        name: "",
        damaged_info: "",
      },
    };
  },
  computed: {
    ...mapGetters(["user"]),
    regions() {
      return this.$store.getters.regions;
    },
  },

  methods: {
    showModal() {
      this.isAddModalVisible = true;
      this.addModalUsedFor = "add";
    },
    showEditModal({ ...region }) {
      this.isAddModalVisible = true;
      this.region = region;
      this.addModalUsedFor = "edit";
    },
    showDeleteModal({ ...region }) {
      this.isDeleteModalVisible = true;
      this.regionForDelete = region;
    },
    closeDeleteModal() {
      this.isDeleteModalVisible = false;
      this.errorMessage = "";
      this.isLoading = false;
      this.regionForDelete = {};
    },
    closeAddModal() {
      this.isAddModalVisible = false;
      this.v$.$reset();
      this.errorMessage = "";
      this.isLoading = false;
      this.region = {};
    },
    async addRegion() {
      this.errorMessage = "";
      this.v$.$validate();
      if (!this.v$.$error) {
        this.isLoading = true;
        try {
          await this.$store.dispatch("addRegion", this.region);
          this.closeAddModal();
        } catch (e) {
          this.errorMessage = "Failed to add Region";
        } finally {
          this.isLoading = false;
        }
      }
    },
    async updateRegion() {
      this.errorMessage = "";
      this.v$.$validate();
      if (!this.v$.$error) {
        this.isLoading = true;
        try {
          await this.$store.dispatch("updateRegion", this.region);
          this.closeAddModal();
        } catch (e) {
          this.errorMessage = "Failed to edit Region";
        } finally {
          this.isLoading = false;
        }
      }
    },
    async deleteRegion() {
      this.errorMessage = "";
      this.isLoading = true;
      try {
        await this.$store.dispatch("deleteRegion", this.regionForDelete.id);
        this.closeDeleteModal();
      } catch (e) {
        this.errorMessage = "Failed to delete Region";
      } finally {
        this.isLoading = false;
      }
    },
  },
  validations() {
    return {
      region: {
        name: {
          required,
          max: helpers.withMessage(
            "Name should not be greater than 50 characters",
            maxLength(50)
          ),
        },
        damaged_info: {
          required,
        },
      },
    };
  },
};
</script>
