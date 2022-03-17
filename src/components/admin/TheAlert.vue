<template>
  <div class="position-fixed wrapper mx-4 top-0 end-0" v-if="isVisible">
    <div
      :class="isSucceed ? 'alert-success' : 'alert-danger'"
      class="alert alert-dismissible fade show"
      role="alert"
    >
      <strong v-if="isSucceed">Good job!</strong>
      <strong v-else>Sorry!</strong>
      {{ message }}
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isSucceed", "message", "isVisible"],
};
</script>

<style scoped>
.wrapper {
  width: 80%;
}
</style>
