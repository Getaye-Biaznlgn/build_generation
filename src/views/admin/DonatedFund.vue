<template>
  <base-card class="bg-light">
    <h4>
      ${{ totalFundAmount }} Fund raised from {{ totalPeopeDonated }} donors!
    </h4>
    <table>
      <tr>
        <th>No</th>
        <th>Donors Name</th>
        <th>Email</th>
        <th>Donors Address</th>
        <th>Donated Amount</th>
        <th>Donated For</th>
        <th>Donated Date</th>
      </tr>
      <tr v-for="(fund, i) in funds" :key="fund.id">
        <td>{{ i + 1 }}</td>
        <td>{{ fund.full_name }}</td>
        <td>{{ fund.email }}</td>
        <td>{{ fund.address }}</td>
        <td>{{ fund.donation_amount }}</td>
        <td>{{ fund.donated_for?.name }}</td>
        <td>
          {{
            new Date(fund.created_at)
              .toString()
              .split(" ")
              .slice(0, 4)
              .join(" ")
          }}
        </td>
      </tr>
    </table>
    <div v-if="funds.length" class="mt-2 d-flex justify-content-end">
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
          currentPage * perPage - perPage + funds.length
        }}
        of {{ total }}
      </div>
    </div>
    <p class="text-center" v-if="!funds.length">
      There is no donated fund here!
    </p>
  </base-card>
</template>
<script>
import apiClient from "../../resources/baseUrl";
export default {
  data() {
    return {
      funds: [],
      totalFundAmount: "",
      totalPeopeDonated: "",
      // pagination
      total: "",
      currentPage: "",
      perPage: "",
      lastPageNo: "",
    };
  },
  methods: {
    navigateTo(pageNo) {
      if (pageNo <= 1 || pageNo >= this.lastPageNo) {
        return;
      }
      this.fetchFunds(10, pageNo);
    },
    changePerPage(e) {
      this.fetchFunds(e.target.value, 1);
    },
    async fetchFunds(perPage, pageNo) {
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get(
          `/api/admin_donation?per_page=${perPage}&&page_no=${pageNo}`
        );
        if (response.status === 200) {
          this.funds = response.data.data;
          this.total = response.data.total;
          this.currentPage = response.data.current_page;
          this.perPage = response.data.per_page;
          this.lastPageNo = response.data.last_page;
        }
      } catch (e) {
        console.log("error");
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
    async fundStatistics() {
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get("/api/total_donation");
        if (response.status === 200) {
          this.totalFundAmount = response.data?.total_money;
          this.totalPeopeDonated = response.data?.total_user;
        }
      } catch (e) {
        //
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
  },
  created() {
    this.fetchFunds(10, 1);
    this.fundStatistics();
  },
};
</script>
