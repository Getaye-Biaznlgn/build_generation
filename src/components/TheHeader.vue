<template>
  <nav
    class="navbar navbar-expand-lg py-2 border-2 border-bottom navbar-light bg-white"
  >
    <div class="container-fluid mx-0 p-0">
      <a
        class="navbar-brand fs-3 fw-bold"
        role="button"
        @click="this.$router.push('/')"
      >
        Build Together
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="container pe-0">
          <ul class="navbar-nav mb-2 mb-lg-0 d-flex justify-content-end">
            <li class="nav-item me-2">
              <select @change="navigateTo($event)" class="mt-2 fw-bold">
                <option value="Home" class="py-1" selected>
                  {{ $t("institution.damagedInstitution", $store.state.lang) }}
                </option>
                <option value="UserHealthcareInstitution" class="my-1">
                  {{
                    $t("institution.healthcareInstitution", $store.state.lang)
                  }}
                </option>
                <option value="UserEducationalInstitution" class="my-2">
                  {{
                    $t("institution.educationalInstitution", $store.state.lang)
                  }}
                </option>
              </select>
            </li>
            <span class="fs-5 d-none d-lg-inline mx-2">|</span>
            <li class="nav-item me-2">
              <a
                href="https://buildgeneration.merahitechnologies.com#howItWork"
                data-bs-toggle="collapse"
                data-bs-target=".navbar-collapse.show"
                class="nav-link fw-bold"
              >
                {{ $t("link.howItWork", $store.state.lang) }}</a
              >
            </li>
            <span class="fs-5 d-none d-lg-inline ms-x">|</span>
            <li class="nav-item me-2">
              <a
                role="button"
                data-bs-toggle="collapse"
                data-bs-target=".navbar-collapse.show"
                class="nav-link fw-bold"
                @click="this.$router.push({ name: 'UserSuccessStory' })"
                >{{ $t("link.successStory", $store.state.lang) }}</a
              >
            </li>
            <span class="fs-5 d-none d-lg-inline mx-2">|</span>
            <li class="nav-item me-2">
              <select
                v-model="lang"
                @change="changeLang($event)"
                class="mt-2 fw-bold"
              >
                <option value="en">EN</option>
                <option value="am">AM</option>
              </select>
            </li>
            <li class="nav-item me-2 mb-2">
              <button
                @click="$emit('showShareModal')"
                class="btn fw-bold shadow-sm btn-outline-warning btn-outline px-3 p-1 fw-bold"
              >
                {{ $t("btn.share", $store.state.lang) }}
              </button>
            </li>
            <li class="nav-item">
              <button
                @click="this.$router.push({ name: 'Payments' })"
                class="btn fw-bold rounded bg-warning py-1 px-3 text-lght fw-bold"
              >
                {{ $t("btn.donate", $store.state.lang) }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      lang: "en",
    };
  },
  methods: {
    navigateTo(event) {
      this.$router.push({ name: event.target.value });
    },
    changeLang(event) {
      this.$store.commit("setLang", event.target.value);
      // localStorage.setItem("lang", this.lang);
      // window.location.reload();
    },
  },
};
</script>
<style scoped>
select {
  border: 0px;
  outline: 0px;
}
</style>
