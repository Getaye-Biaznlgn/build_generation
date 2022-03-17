<template>
  <base-card>
    <strong class="fw-bold d-block mb-3">Account Setting</strong>
    <div class="border-bottom mb-2">
      <strong>Name</strong>
      <span class="ms-5">{{ user.first_name + " " + user.last_name }}</span>
    </div>
    <div class="border-bottom mb-2">
      <strong>Email</strong> <span class="ms-5">{{ user.email }}</span>
    </div>
    <div class="border-bottom mb-2">
      <strong>Phone Number</strong>
      <span class="ms-5">{{ user.phone_no }}</span>
    </div>
    <button
      @click="showChangePasswordModal"
      class="btn d-block ms-auto bg-dark-blue text-white"
    >
      Change Password
    </button>
  </base-card>

  <base-modal :modalState="isModalVisible" @close="closeChangePasswordModal">
    <form @submit.prevent>
      <div class="mb-3" :class="{ warining: v$.password.oldPassword.$error }">
        <label for="#oldPassword" class="form-label">Old Password</label>
        <input
          class="form-control"
          v-model.trim="password.oldPassword"
          @blur="v$.password.oldPassword.$touch"
          id="oldPassword"
          type="password"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.password.oldPassword.$errors"
          :key="index"
          >{{ error.$message + ", " }}</span
        >
      </div>

      <div class="mb-3" :class="{ warining: v$.password.newPassword.$error }">
        <label for="#newPassword" class="form-label">New Password</label>
        <input
          class="form-control"
          v-model.trim="password.newPassword"
          @blur="v$.password.newPassword.$touch"
          id="newPassword"
          type="password"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.password.newPassword.$errors"
          :key="index"
          >{{ error.$message + ", " }}</span
        >
      </div>

      <div
        class="mb-3"
        :class="{ warining: v$.password.confirmPassword.$error }"
      >
        <label for="#confirmPassword" class="form-label"
          >Confirm Password</label
        >
        <input
          class="form-control"
          v-model.trim="password.confirmPassword"
          @blur="v$.password.confirmPassword.$touch"
          id="confirmPassword"
          type="password"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.password.confirmPassword.$errors"
          :key="index"
          >{{ error.$message + ", " }}</span
        >
      </div>
      <base-button
        title="Save"
        :isLoading="isLoading"
        :errorMessage="errorMessage"
        loadingTitle="Saving"
        @submit="save"
      />
    </form>
    <p class="text-success">{{ successMessagee }}</p>
  </base-modal>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required, helpers, sameAs } from "@vuelidate/validators";
import { mapGetters } from "vuex";
import apiClient from "../../resources/baseUrl";
export default {
  data() {
    return {
      v$: useValidate(),
      password: {
        newPassword: "",
        oldPassword: "",
        confirmPassword: "",
      },
      errorMessage: "",
      isModalVisible: false,
      isLoading: false,
      successMessagee: "",
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    showChangePasswordModal() {
      this.successMessagee = "";
      this.isModalVisible = true;
    },
    closeChangePasswordModal() {
      this.isModalVisible = false;
      this.password.newPassword = "";
      this.password.oldPassword = "";
      this.password.confirmPassword = "";
      this.successMessagee = "";
      this.errorMessage = "";
      this.v$.$reset();
    },
    async save() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.isLoading = true;
        try {
          let response = await apiClient.post("api/change_password", {
            new_password: this.password.newPassword,
            old_password: this.password.oldPassword,
          });
          if (response.status === 200) {
            this.successMessagee = "Password is changed successfully";
          } else {
            throw "";
          }
        } catch (e) {
          this.errorMessage = "Faild to change password";
        } finally {
          this.isLoading = false;
        }
      }
    },
  },
  validations() {
    return {
      password: {
        newPassword: {
          required: helpers.withMessage(
            "New password can not be empty",
            required
          ),
        },
        oldPassword: {
          required: helpers.withMessage(
            "Old password can not be empty",
            required
          ),
        },
        confirmPassword: {
          required: helpers.withMessage("Confirm password", required),
          sameAs: helpers.withMessage(
            "Faild to confirm",
            sameAs(this.password.newPassword)
          ),
        },
      },
    };
  },
};
</script>
