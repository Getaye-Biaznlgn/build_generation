<template>
  <div class="d-flex justify-content-end my-2">
    <div class="pe-2">
      <select
        @change="handleFilter($event)"
        class="form-select"
        v-model="regionIdForFilter"
        aria-label="selectFilte"
      >
        <option value=" ">Region</option>
        <option v-for="region in regions" :Key="region.id" :value="region.id">
          {{ region.name }}
        </option>
      </select>
    </div>
    <div class="pe-2">
      <select
        class="form-select"
        @change="handleFilter($event)"
        v-model="zoneIdForFilter"
        aria-label="selectFilterRegion"
      >
        <option value=" ">Zone</option>
        <option v-for="zone in filteredZones" :key="zone.id" :value="zone.id">
          {{ zone.name }}
        </option>
      </select>
    </div>
  </div>
  <div class="container d-lg-flex">
    <fade-transition>
      <div v-if="this.selectedRegion" class="me-4">
        <strong class="d-block text-capitalize">{{
          selectedRegion?.name
        }}</strong>
        <p>{{ selectedRegion?.damaged_info }}</p>
      </div>
    </fade-transition>
    <fade-transition name="fade" appear mode="in-out">
      <div v-if="this.selectedZone" class="ms-4">
        <strong class="text-capitalize">{{ selectedZone?.name }}</strong>
        <p>{{ selectedZone?.damaged_info }}</p>
      </div>
    </fade-transition>
  </div>

  <institution-item
    v-for="(item, index) in healthcareInstitutions"
    :key="item.id"
    :institution="item"
    :index="index"
  />
  <!-- pagination -->
  <div
    v-if="healthcareInstitutions.length"
    class="mt-2 d-flex justify-content-end"
  >
    <select
      class="form-contro"
      @change="changePerPage($event)"
      aria-label="per page"
    >
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="20">30</option>
      <option value="50">50</option>
      <option value="100">100</option>
      <option value="200">200</option>
    </select>

    <nav class="mx-3" aria-label="Page navigation">
      <ul class="pagination mb-0">
        <li class="page-item">
          <a
            v-show="currentPage > 1"
            class="page-link"
            @click="navigateTo(currentPage - 1)"
            role="button"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        <li v-for="n in lastPageNo" :key="n" class="page-item">
          <a
            class="page-link"
            :class="{ 'bg-dark-blue text-light': currentPage === n }"
            role="button"
            @click="navigateTo(n)"
            >{{ n }}</a
          >
        </li>

        <li class="page-item">
          <a
            class="page-link"
            v-show="currentPage + 1 < lastPageNo"
            @click="navigateTo(currentPage + 1)"
            role="button"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    <div class="fw-bold mt-2">
      Result {{ currentPage * perPage - perPage + 1 }}-{{
        currentPage * perPage - perPage + healthcareInstitutions.length
      }}
      of {{ total }}
    </div>
  </div>
  <p class="text-center" v-if="!healthcareInstitutions.length">
    Damaged healthcare institution is not added yet!
  </p>
</template>

<script>
import apiClient from "../resources/baseUrl";
import InstitutionItem from "../components/InstitutionItem.vue";
import FadeTransition from "../components/FadeTransition.vue";
export default {
  emits: {
    showShareModal() {
      return true;
    },
  },
  components: {
    InstitutionItem,
    FadeTransition,
  },
  data() {
    return {
      healthcareInstitutions: [],
      zoneIdForFilter: " ",
      regionIdForFilter: " ",
      zones: [],
      regions: [],
      // pagination
      total: "",
      currentPage: "",
      perPage: "",
      lastPageNo: "",
    };
  },
  computed: {
    selectedZone() {
      return this.zones.find((zone) => {
        return zone.id === this.zoneIdForFilter;
      });
    },
    selectedRegion() {
      return this.regions.find((region) => {
        return region.id === this.regionIdForFilter;
      });
    },
    filteredZones() {
      return this.zones.filter((zone) => {
        return zone.region_id == this.regionIdForFilter;
      });
    },
  },
  methods: {
    handleFilter() {
      this.fetchHealthInstitutions(10, 1);
    },

    navigateTo(pageNo) {
      if (pageNo <= 1 || pageNo >= this.lastPageNo) {
        return;
      }
      this.fetchHealthInstitutions(10, pageNo);
    },
    changePerPage(e) {
      this.fetchHealthInstitutions(e.target.value, 1);
    },
    async fetchZones() {
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get("/api/zones");
        if (response.status === 200) {
          this.zones = response.data;
        }
      } catch (e) {
        //
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
    async fetchRegions() {
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get("/api/regions");
        if (response.status === 200) {
          this.regions = response.data;
        }
      } catch (e) {
        //
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
    async fetchHealthInstitutions(perPage, pageNo) {
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get(
          `/api/user_posts?type=health&&per_page=${perPage}&&page_no=${pageNo}&&region=${this.regionIdForFilter}&&zone=${this.zoneIdForFilter}`
        );
        if (response.status === 200) {
          this.healthcareInstitutions = response.data.data;
          this.total = response.data.meta.total;
          this.currentPage = response.data.meta.current_page;
          this.perPage = response.data.meta.per_page;
          this.lastPageNo = response.data.meta.last_page;
        }
      } catch (e) {
        //
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
  },
  watch: {
    regionIdForFilter() {
      this.zoneIdForFilter = " ";
    },
  },
  created() {
    this.fetchRegions();
    this.fetchZones();
    this.fetchHealthInstitutions(10, 1);
  },
};
</script>

<style scoped>
.bg-dark-blue {
  background-color: #2f4587;
}
</style>
