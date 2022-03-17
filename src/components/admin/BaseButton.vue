<template>
  <div>
    <button
      class="btn bg-dark-blue d-block ms-auto px-3 text-white"
      type="submit"
      @click="$emit('submit')"
    >
      <span v-if="isLoading">
        <span
          class="spinner-border spinner-border-sm mx-2"
          role="status"
          aria-hidden="true"
        ></span>
        <span>{{ loadingTitle }}</span>
      </span>
      <span v-else>{{ title }}</span>
    </button>
    <p class="text-danger text-center small">{{ errorMessage }}</p>
  </div>
</template>
<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Submit",
    },
    loadingTitle: {
      type: String,
      default: "Submiting",
    },
    errorMessage: {
      type: String,
    },
  },
};
</script>
