<template>
  <base-card>
    <button
      @click="showModal"
      class="btn ms-auto d-block bg-dark-blue text-light"
    >
      Add New Coordinator
    </button>
    <table class="mt-2">
      <tr>
        <th>No</th>
        <th>Name</th>
        <th>Phone No</th>
        <th>Email</th>
        <th>Verified</th>
        <th><span class="sr-only">Action</span></th>
      </tr>
      <tr v-for="(coordinator, i) in coordinators" :key="coordinator.id">
        <td>{{ i + 1 }}</td>
        <td>{{ coordinator.first_name + " " + coordinator.last_name }}</td>
        <td>{{ coordinator.phone_no }}</td>
        <td>{{ coordinator.email }}</td>
        <td>
          <span v-if="coordinator.email_verified_at"> Verified </span>
          <span v-else> Unverified </span>
        </td>
        <td>
          <span @click="showEditModal(coordinator)" class="me-2" role="button"
            ><i class="far fa-edit"></i
          ></span>
          <span @click="showDeleteModal(coordinator)" role="button"
            ><i class="fas fa-trash"></i
          ></span>
        </td>
      </tr>
    </table>
    <p class="text-center" v-if="!coordinators.length">
      Coordinator wasn't aded yet!
    </p>
  </base-card>

  <!-- add coordinators -->
  <base-modal :modalState="isAddModalVisible" @close="closeAddModal">
    <form @submit.prevent>
      <div class="mb-3" :class="{ warining: v$.coordinator.first_name.$error }">
        <label for="fname" class="form-label">First Name</label>
        <input
          type="text"
          class="form-control"
          id="fname"
          v-model.trim="coordinator.first_name"
          @blur="v$.coordinator.first_name.$touch"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.coordinator.first_name.$errors"
          :key="index"
        >
          {{ error.$message + ", " }}</span
        >
      </div>
      <div class="mb-3" :class="{ warining: v$.coordinator.last_name.$error }">
        <label for="lname" class="form-label">Last Name</label>
        <input
          type="text"
          class="form-control"
          id="lname"
          v-model.trim="coordinator.last_name"
          @blur="v$.coordinator.last_name.$touch"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.coordinator.last_name.$errors"
          :key="index"
        >
          {{ error.$message + ", " }}</span
        >
      </div>
      <div class="mb-3" :class="{ warining: v$.coordinator.phone_no.$error }">
        <label for="phone_no" class="form-label">Phone no</label>
        <input
          type="phone_no"
          class="form-control"
          id="phone_no"
          v-model.trim="coordinator.phone_no"
          @blur="v$.coordinator.phone_no.$touch"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.coordinator.phone_no.$errors"
          :key="index"
        >
          {{ error.$message + ", " }}</span
        >
      </div>
      <div class="mb-3" :class="{ warining: v$.coordinator.email.$error }">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model.trim="coordinator.email"
          @blur="v$.coordinator.email.$touch"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.coordinator.email.$errors"
          :key="index"
        >
          {{ error.$message + ", " }}</span
        >
      </div>

      <base-button
        v-if="addModalUsedFor === 'add'"
        title="Save"
        :isLoading="isLoading"
        :errorMessage="errorMessage"
        loadingTitle="Saving"
        @submit="addCoordinator"
      />

      <base-button
        v-if="addModalUsedFor === 'edit'"
        title="Save changes"
        :isLoading="isLoading"
        :errorMessage="errorMessage"
        loadingTitle="Saving"
        @submit="updateCoordinator"
      />
    </form>
  </base-modal>

  <!--delete modal  -->
  <base-modal :modalState="isDeleteModalVisible" @close="closeDeleteModal">
    <strong class="mt-0 fs-5">Delete</strong>
    <p>
      Do u want delete coordinator
      {{
        coordinatorForDelete?.first_name + " " + coordinatorForDelete.last_name
      }}?
    </p>
    <base-button
      class="mt-3"
      title="Delete"
      :isLoading="isLoading"
      :errorMessage="errorMessage"
      loadingTitle="Deleting"
      @submit="deleteCoordinator"
    />
  </base-modal>
</template>

<script>
import useValidate from "@vuelidate/core";
import {
  required,
  helpers,
  maxLength,
  email,
  numeric,
} from "@vuelidate/validators";
import apiClient from "../../resources/baseUrl";
export default {
  data() {
    return {
      v$: useValidate(),
      isAddModalVisible: "",
      isDeleteModalVisible: "",
      isLoading: false,
      errorMessage: "",
      coordinatorForDelete: "",
      // i used add modal for add and update
      addModalUsedFor: "add",
      coordinators: [],
      coordinator: {
        first_name: "",
        last_name: "",
        email: "",
        phone_no: "",
      },
    };
  },

  methods: {
    showModal() {
      this.errorMessage = "";
      this.isAddModalVisible = true;
      this.addModalUsedFor = "add";
    },
    showEditModal({ ...coordinator }) {
      this.errorMessage = "";
      this.isAddModalVisible = true;
      this.coordinator = coordinator;
      this.addModalUsedFor = "edit";
    },
    showDeleteModal({ ...coordinator }) {
      this.errorMessage = "";
      this.isDeleteModalVisible = true;
      this.coordinatorForDelete = coordinator;
    },
    closeDeleteModal() {
      this.isDeleteModalVisible = false;
      this.errorMessage = "";
      this.isLoading = false;
      this.coordinatorForDelete = {};
    },
    closeAddModal() {
      this.isAddModalVisible = false;
      this.v$.$reset();
      this.errorMessage = "";
      this.isLoading = false;
      this.coordinator = {};
    },
    async fetchCoordinator() {
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get("/api/users");
        if (response.status === 200) {
          this.coordinators = response.data;
        }
      } catch (e) {
        console.log("error");
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
    async addCoordinator() {
      this.errorMessage = "";
      this.v$.$validate();
      if (!this.v$.$error) {
        this.isLoading = true;
        try {
          const response = await apiClient.post("/api/users", this.coordinator);
          if (response.status === 201) {
            this.coordinators.push(response.data);
            this.closeAddModal();
          } else throw "";
        } catch (e) {
          this.errorMessage = "Failed to add coordinator";
        } finally {
          this.isLoading = false;
        }
      }
    },
    async updateCoordinator() {
      this.errorMessage = "";
      this.v$.$validate();
      if (!this.v$.$error) {
        this.isLoading = true;
        try {
          const response = await apiClient.put("/api/users", this.coordinator);
          if (response.status === 200) {
            const editedIndex = this.coordinators.findIndex((coordinator) => {
              return coordinator.id === coordinator.id;
            });
            this.coordinators[editedIndex] = response.data;
            this.closeAddModal();
          } else throw "";
        } catch (e) {
          this.errorMessage = "Failed to edit coordinator";
        } finally {
          this.isLoading = false;
        }
      }
    },
    async deleteCoordinator() {
      this.errorMessage = "";
      this.isLoading = true;
      try {
        const response = await apiClient.delete(
          `/api/users/${this.coordinatorForDelete.id}`
        );
        if (response.status === 200) {
          const deletedIndex = this.coordinators.findIndex((coordinator) => {
            return coordinator.id === this.coordinatorForDelete.id;
          });
          this.coordinators.splice(deletedIndex, 1);
          this.closeDeleteModal();
        }
      } catch (e) {
        this.errorMessage = "Failed to delete coordinator";
      } finally {
        this.isLoading = false;
      }
    },
  },
  created() {
    this.fetchCoordinator();
  },
  validations() {
    return {
      coordinator: {
        first_name: {
          required,
          max: helpers.withMessage(
            "First name should not be greater than 50 characters",
            maxLength(50)
          ),
        },
        last_name: {
          required,
          max: helpers.withMessage(
            "Last name should not be greater than 50 characters",
            maxLength(50)
          ),
        },
        phone_no: {
          numeric,
          required,
          max: helpers.withMessage(
            "Value shouldn't be greater than 10 chracters",
            maxLength(10)
          ),
        },
        email: {
          required,
          email,
        },
      },
    };
  },
};
</script>
