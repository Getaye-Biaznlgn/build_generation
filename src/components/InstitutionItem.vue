<template>
  <div class="container d-lg-flex justify-content-between mb-5">
    <transition @before-enter="beforeEnterImage" appear>
      <div class="order-2" :id="'storyImage' + index">
        <img
          :src="institution?.image?.path"
          alt="damaged institution image"
          class="img"
        />
      </div>
    </transition>
    <transition @before-enter="beforeEnterDescription" appear>
      <div class="order-1 pe-lg-5" :id="'storyDescription' + index">
        <h5 class="text-capitalize mt-3 fw-bold mt-lg-0">
          {{ institution.title }}
        </h5>
        <p class="fw-bold text-capitalize">
          Location:
          {{
            `${institution.region?.name} region,  
           ${institution.zone?.name} zone`
          }}
          <span v-if="institution.woreda">{{
            institution.woreda + " Woreda "
          }}</span>
          <span v-if="institution.kebele">{{
            institution.kebele + " Kebele/town"
          }}</span>
        </p>
        <p class="mb-1">
          {{ institution.description.slice(0, 50) }}
        </p>
        <a
          class="d-block text-decoration-none"
          role="button"
          @click="
            this.$router.push({
              name: 'UserInstitutionDetail',
              params: {
                id: institution.id,
              },
            })
          "
          >{{ $t("btn.seeAll", $store.state.lang) }}</a
        >
      </div>
    </transition>
  </div>
</template>

<script>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default {
  props: ["institution", "index"],
  methods: {
    beforeEnterImage(el) {
      el.style.transform = "translateY(100px) translateX(100px)";
      el.style.opacity = 0;
    },
    beforeEnterDescription(el) {
      el.style.transform = "translateY(100px) translateX(-100px)";
      el.style.opacity = 0;
    },
  },
  mounted() {
    gsap.to("#storyImage" + this.index, {
      scrollTrigger: {
        trigger: "#storyImage" + this.index,
        toggleActions: "restart pause resume none",
      },
      opacity: 1,
      y: 0,
      x: 0,
      duration: 0.8,
      delay: this.index * 0.2,
    });
    gsap.to("#storyDescription" + this.index, {
      scrollTrigger: {
        trigger: "#storyDescription" + this.index,
        toggleActions: "restart pause resume none",
      },
      opacity: 1,
      y: 0,
      x: 0,
      duration: 0.8,
      delay: this.index * 0.2,
    });
  },
};
</script>
