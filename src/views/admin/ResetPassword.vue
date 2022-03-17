<template>
  <div class="col-md-3 mx-auto border rounded-1 px-3 pt-3 mt-5">
    <h4 class="mt-2 mx-auto">Reset Password</h4>

    <form class="pt-1" @submit.prevent="submit">
      <div class="mb-4" :class="{ warining: v$.resetPassword.password.$error }">
        <label for="#password" class="form-label">Password</label>
        <div class="d-flex position-relative">
          <input
            class="form-control"
            v-model="resetPassword.password"
            id="password"
            type="password"
            aria-label=".form-control-lg"
            @blur="v$.resetPassword.password.$touch"
          />
        </div>
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.resetPassword.password.$errors"
          :key="index"
          >{{ error.$message + ", " }}</span
        >
      </div>
      <div
        class="mb-4"
        :class="{ warining: v$.resetPassword.confirmPassword.$error }"
      >
        <label for="#password" class="form-label">Confirm Password</label>
        <div class="d-flex position-relative">
          <input
            class="form-control"
            v-model="resetPassword.confirmPassword"
            id="confirmPassword"
            type="password"
            aria-label=".form-control-lg"
            @blur="v$.resetPassword.confirmPassword.$touch"
          />
        </div>
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.resetPassword.confirmPassword.$errors"
          :key="index"
          >{{ error.$message + ", " }}</span
        >
      </div>

      <div class="d-grid gap-2">
        <button class="btn text-white" type="submit">
          <span
            v-if="isLoading"
            class="spinner-border spinner-border-sm mx-2"
            role="status"
            aria-hidden="true"
          ></span>
          <span>Save Password</span>
        </button>
        <p class="text-danger text-center small">{{ notify }}</p>
      </div>
    </form>
  </div>
</template>

<script>
import { required, helpers, sameAs, minLength } from "@vuelidate/validators";
import useValidate from "@vuelidate/core";
import apiClient from "../../resources/baseUrl";
export default {
  props: ["code"],
  data() {
    return {
      v$: useValidate(),
      resetPassword: {
        password: "",
        confirmPassword: "",
      },
      isLoading: false,
      notify: "",
    };
  },
  validations() {
    return {
      resetPassword: {
        password: {
          minLength: minLength(8),
          required: helpers.withMessage("Password can't be empty", required),
        },
        confirmPassword: {
          required: helpers.withMessage("Confirm password", required),
          sameAs: helpers.withMessage(
            "Failed to confirm",
            sameAs(this.resetPassword.password)
          ),
        },
      },
    };
  },
  methods: {
    async submit() {
      this.notify = "";
      this.v$.$validate();
      if (!this.v$.$error) {
        this.isLoading = true;
        try {
          const response = await apiClient.post("/api/reset/" + this.code, {
            password: this.resetPassword.password,
          });
          if (response.status == 200) {
            apiClient.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${response.data.access_token}`;
            this.$store.commit("setToken", response.data.access_token);
            this.$store.commit("setUser", response.data.user);
            this.$store.commit("setIsAuthenticated", true);
            let user = response.data.user;

            localStorage.setItem("tokenB", response.data.access_token);
            localStorage.setItem("user", JSON.stringify(user));

            this.$router.push({ name: "AdminDashboard" });
          }
        } catch (e) {
          this.notify = "Failed";
        } finally {
          this.isLoading = false;
        }
      }
    },
  },
};
</script>
<style scoped>
.btn {
  background-color: #2f4587;
}
</style>
