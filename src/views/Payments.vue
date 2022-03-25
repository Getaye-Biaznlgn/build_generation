<template>
  <div class="wrapper mx-auto mt-3">
    <div v-if="!paidFor">
      <h3 class="text-center">
        Donate to build the next generation of Ethiopia!
      </h3>
      <form @submit.prevent>
        <div class="mb-3" :class="{ warining: v$.payment.amount.$error }">
          <label for="amount" class="form-label"
            >Amount in <strong>USD</strong></label
          >
          <input
            type="number"
            class="form-control"
            id="amount"
            v-model.trim="payment.amount"
            @blur="v$.payment.amount.$touch"
          />
          <span
            class="error-msg mt-1"
            v-for="(error, index) of v$.payment.amount.$errors"
            :key="index"
          >
            {{ error.$message + ", " }}</span
          >
        </div>
        <div
          class="mb-3"
          :class="{ warining: v$.payment.word_of_support.$error }"
        >
          <label for="WordOfSupport" class="form-label">Word Of Support</label>
          <textarea
            type="text"
            class="form-control"
            id="WordOfSupport"
            rows="5"
            v-model.trim="payment.word_of_support"
            @blur="v$.payment.word_of_support.$touch"
          />
          <span
            class="error-msg mt-1"
            v-for="(error, index) of v$.payment.word_of_support.$errors"
            :key="index"
            >{{ error.$message + ", " }}</span
          >
        </div>
        <div class="mb-3" :class="{ warining: v$.payment.region_id.$error }">
          <label for="region" class="form-label">Region</label>
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="payment.region_id"
            @blur="v$.payment.region_id.$touch"
          >
            <option
              v-for="region in regions"
              :key="region.id"
              :value="region.id"
            >
              {{ region.name }}
            </option>
          </select>
          <span
            class="error-msg mt-1"
            v-for="(error, index) of v$.payment.region_id.$errors"
            :key="index"
            >{{ error.$message + ", " }}</span
          >
        </div>
        <div class="mb-3" :class="{ warining: v$.payment.zone_id.$error }">
          <label for="zone" class="form-label">Zone</label>
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="payment.zone_id"
            @blur="v$.payment.zone_id.$touch"
          >
            <option
              v-for="zone in filteredZonesForAdd"
              :key="zone.id"
              :value="zone.id"
            >
              {{ zone.name }}
            </option>
          </select>
          <span
            class="error-msg mt-1"
            v-for="(error, index) of v$.payment.zone_id.$errors"
            :key="index"
            >{{ error.$message + ", " }}</span
          >
        </div>
        <div class="form-check my-3">
          <input
            v-model="payment.is_visible"
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            Don't display my name publicly
          </label>
        </div>
        <div ref="paypal"></div>
      </form>
    </div>

    <div v-if="paidFor" class="acknowledgment">
      <p>
        <strong>Thank you!</strong> for your contribution to Save Ethiopian next
        generation.
      </p>
    </div>
  </div>
</template>

<script>
// import image from "../assets/lamp.png"
import apiClient from "../resources/baseUrl";
import useValidate from "@vuelidate/core";
import {
  required,
  numeric,
  maxLength,
  helpers,
  minValue,
} from "@vuelidate/validators";
export default {
  name: "HelloWorld",

  data: function () {
    return {
      v$: useValidate(),
      regions: [],
      zones: [],

      loaded: false,
      paidFor: false,
      payment: {
        amount: "",
        word_of_support: "",
        is_visible: false,
        region_id: "",
        zone_id: "",
        description: "donation for damaged institution in ethiopia",
      },
    };
  },
  computed: {
    filteredZonesForAdd() {
      return this.zones.filter((zone) => {
        return zone.region?.id === this.payment.region_id;
      });
    },
  },
  beforeMount() {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AXRU3F6eLcQ3UOd72yIHbkuf5UJjZUGJqSYuy9MOe-Ppcbfk9ivWEdUAyziCrDqXK-k4uieQEi3AjZCa";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },
  methods: {
    setLoaded: function () {
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            this.v$.$validate();
            if (this.v$.$error) return;
            return actions.order.create({
              purchase_units: [
                {
                  description: this.payment.description,
                  amount: {
                    currency_code: "USD",
                    value: this.payment.amount,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.paidFor = true;
            console.log(order);
            this.addPayment(order);
          },
          onError: () => {
            // console.log(err);
          },
        })
        .render(this.$refs.paypal);
    },
    async addPayment(order) {
      console.log("order2", order);
      try {
        const response = await apiClient.post("/api/user_donation", {
          full_name:
            order?.payer.name?.given_name + " " + order?.payer.name?.surname,
          email: order.payer?.email_address,
          address: order.payer?.address?.country_code,
          word_of_support: this.payment.word_of_support,
          donation_amount: order.purchase_units?.[0]?.amount?.value,
          currency_code: order.purchase_units?.[0]?.amount?.currency_code,
          is_visible: !this.payment.is_visible,
          donated_to: this.payment.zone_id,
          region_id: this.payment.region_id,
        });
        if (response.status === 201) {
          // console.log("good to save");
        } else throw "";
      } catch (e) {
        // console.log("faild to save");
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
  },
  created() {
    this.fetchRegions();
    this.fetchZones();
  },
  validations() {
    return {
      payment: {
        amount: {
          required,
          minValue: minValue(5),
          numeric,
        },
        word_of_support: {
          max: helpers.withMessage(
            "Word of support shoudn't be greater than 700",
            maxLength(700)
          ),
        },
        zone_id: {
          required,
        },
        region_id: {
          required,
        },
      },
    };
  },
};
</script>
<style scoped>
.wrapper {
  width: 100%;
}
.acknowledgment {
  height: 50vh;
}
@media (min-width: 801px) {
  .wrapper {
    width: 50%;
  }
}
</style>
