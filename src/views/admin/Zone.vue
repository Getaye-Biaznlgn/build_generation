<template>
  <base-card>
    <button
      v-if="user.role?.name === 'super_admin'"
      @click="showAddModal"
      class="btn ms-auto d-block bg-dark-blue text-light"
    >
      Add New Zone
    </button>
    <table class="mt-2">
      <tr>
        <th>No</th>
        <th>Name</th>
        <th>Region</th>
        <th>Damaged Info</th>
        <th><span class="sr-only">Action</span></th>
      </tr>
      <tr v-for="(zone, i) in zones" :key="zone?.id">
        <td>{{ i + 1 }}</td>
        <td>{{ zone?.name }}</td>
        <td>{{ zone.region?.name }}</td>
        <td>{{ zone.damaged_info?.slice(0, 50) }}...</td>
        <td>
          <span @click="showEditModal(zone)" class="me-2" role="button"
            ><i v-if="user.role?.name === 'super_admin'" class="far fa-edit"></i
            ><i v-else class="fas fa-ellipsis-h"></i
          ></span>
          <span
            v-if="user.role?.name === 'super_admin'"
            @click="showDeleteModal(zone)"
            role="button"
            ><i class="fas fa-trash"></i
          ></span>
        </td>
      </tr>
    </table>
    <p class="text-center" v-if="!zones.length">Zones wasn't aded yet!</p>
  </base-card>

  <!-- add zones -->
  <base-modal :modalState="isAddModalVisible" @close="closeAddModal">
    <form @submit.prevent>
      <div class="mb-3" :class="{ warining: v$.zone.name.$error }">
        <label for="name" class="form-label">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model.trim="zone.name"
          :disabled="user.role?.name !== 'super_admin'"
          @blur="v$.zone.name.$touch"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.zone.name.$errors"
          :key="index"
        >
          {{ error.$message + ", " }}</span
        >
      </div>
      <div class="mb-3" :class="{ warining: v$.zone.region_id.$error }">
        <label for="region" class="form-label">Region</label>
        <select
          class="form-select"
          v-model="zone.region_id"
          @blur="v$.zone.region_id.$touch"
          :disabled="user.role?.name !== 'super_admin'"
        >
          <option v-for="region in regions" :key="region.id" :value="region.id">
            {{ region.name }}
          </option>
        </select>
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.zone.region_id.$errors"
          :key="index"
        >
          {{ error.$message + ", " }}</span
        >
      </div>
      <div class="mb-3" :class="{ warining: v$.zone.damaged_info.$error }">
        <label for="damaged_info" class="form-label"
          >Description of damage</label
        >
        <textarea
          type="text"
          class="form-control"
          id="damaged_info"
          rows="5"
          :disabled="user.role?.name !== 'super_admin'"
          v-model.trim="zone.damaged_info"
          @blur="v$.zone.damaged_info.$touch"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.zone.damaged_info.$errors"
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
        @submit="addZone"
      />

      <base-button
        v-if="addModalUsedFor === 'edit' && user.role?.name === 'super_admin'"
        title="Save changes"
        :isLoading="isLoading"
        :errorMessage="errorMessage"
        loadingTitle="Saving"
        @submit="updateZone"
      />
    </form>
  </base-modal>

  <!--delete modal  -->
  <base-modal :modalState="isDeleteModalVisible" @close="closeDeleteModal">
    <strong class="mt-0 fs-5">Delete</strong>
    <p>Do u want delete zone {{ zoneForDelete?.name }} ?</p>
    <base-button
      class="mt-3"
      title="Delete"
      :isLoading="isLoading"
      :errorMessage="errorMessage"
      loadingTitle="Deleting"
      @submit="deleteZone"
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
      zoneForDelete: "",
      // i used add modal for add and update
      addModalUsedFor: "add",
      zone: {
        name: "",
        damaged_info: "",
        region_id: "",
      },
    };
  },
  computed: {
    ...mapGetters(["regions", "zones", "user"]),
  },
  methods: {
    showAddModal() {
      this.isAddModalVisible = true;
      this.addModalUsedFor = "add";
    },
    showEditModal({ ...zone }) {
      this.isAddModalVisible = true;
      this.zone = zone;
      this.zone.region_id = zone.region?.id;
      this.addModalUsedFor = "edit";
    },
    showDeleteModal({ ...zone }) {
      this.isDeleteModalVisible = true;
      this.zoneForDelete = zone;
    },
    closeDeleteModal() {
      this.isDeleteModalVisible = false;
      this.errorMessage = "";
      this.isLoading = false;
      this.zoneForDelete = {};
    },
    closeAddModal() {
      this.isAddModalVisible = false;
      this.v$.$reset();
      this.errorMessage = "";
      this.isLoading = false;
      this.zone = {};
    },
    async addZone() {
      this.errorMessage = "";
      this.v$.$validate();
      if (!this.v$.$error) {
        this.isLoading = true;
        try {
          await this.$store.dispatch("addZone", this.zone);
          this.closeAddModal();
        } catch (e) {
          this.errorMessage = "Failed to add Zone";
        } finally {
          this.isLoading = false;
        }
      }
    },
    async updateZone() {
      this.errorMessage = "";
      this.v$.$validate();
      if (!this.v$.$error) {
        this.isLoading = true;
        try {
          await this.$store.dispatch("updateZone", this.zone);
          this.closeAddModal();
        } catch (e) {
          this.errorMessage = "Failed to edit Zone";
        } finally {
          this.isLoading = false;
        }
      }
    },
    async deleteZone() {
      this.errorMessage = "";
      this.isLoading = true;
      try {
        await this.$store.dispatch("deleteZone", this.zoneForDelete.id);
        this.closeDeleteModal();
      } catch (e) {
        this.errorMessage = "Failed to delete zone";
      } finally {
        this.isLoading = false;
      }
    },
  },
  validations() {
    return {
      zone: {
        name: {
          required,
          max: helpers.withMessage(
            "Name should not be greater than 50 characters",
            maxLength(50)
          ),
        },
        region_id: {
          required,
        },
        damaged_info: {
          required,
        },
      },
    };
  },
};
</script>
