<template>
  You have verified your email successfully!. Reset your password please!
</template>

<script>
import apiClient from "../../resources/baseUrl";
export default {
  methods: {
    async verifyEmail() {
      const query = this.$route.query.verify_url;
      try {
        const response = await apiClient.get("/api/verify?" + query);
        if (response.status === 200) {
          // this.$router.push({ name: "ResetPassword" });
        } else throw "";
      } catch (e) {
        console.log(e);
      }
    },
  },
  created() {
    this.verifyEmail();
  },
};
</script>

<style></style>
