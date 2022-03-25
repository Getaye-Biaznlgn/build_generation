<template>
  <base-modal
    class="shareModal"
    :modalState="isSocialShareVisible"
    @close="closeShareModal"
  >
    <h2 class="fw-bold">Help By Sharing</h2>
    <p>Share on the social media is one way of help</p>
    <hr />
    <div class="order-2 d-flex justify-content-center">
      <div class="mx-1 mx-lg-4">
        <a
          :href="`https://www.facebook.com/sharer.php?u=${postUrl}`"
          target="_blank"
          class="fs-2 ms-2 facebook-link text-center"
          id="facebookLink"
          ><i class="fab fa-facebook-square"></i>
        </a>
        <div>facebook</div>
      </div>
      <div>
        <a
          :href="`https://twitter.com/share?url=${postUrl}&text=${postTitle}&via=[via]&hashtags=#donation`"
          target="_blank"
          class="fs-2 twitter-link"
          id="twitterLink"
          ><i class="fab fa-twitter-square"></i>
        </a>
        <div>twitter</div>
      </div>
      <div class="mx-1 mx-lg-4">
        <a
          :href="`https://www.linkedin.com/shareArticle?${this.postUrl}&title=${postTitle}`"
          target="_blank"
          class="fs-2 ms-2 mx-md-2 linkedin-link"
          id="linkedinLink"
          ><i class="fab fa-linkedin"></i
        ></a>
        <div>linkedin</div>
      </div>
    </div>
  </base-modal>
</template>

<script>
export default {
  props: ["isSocialShareVisible"],
  data() {
    return {
      postUrl: encodeURI(window.location.href),
      postTitle: "Be the cause to alive others",
    };
  },
  mounted() {},
  methods: {
    closeShareModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.twitter-link {
  color: "#1da1f2";
}
.facebook-link {
  color: "#1877f2";
}
.linkedin-link {
  color: "#0077b5";
}
</style>
