<template>
  <div class="container d-lg-flex justify-content-between px-0 mb-5">
    <transition @before-enter="beforeEnterImage" appear>
      <div class="order-2" :id="'fadeImage' + index">
        <img :src="news.images?.path" alt="damaged news image" class="img" />
      </div>
    </transition>
    <transition @before-enter="beforeEnterDescription" appear>
      <div class="order-1 pe-lg-5" :id="'fadeDescription' + index">
        <h5 class="text-capitalize mt-3 fw-bold mt-lg-0">
          {{ news.title }}
        </h5>
        <p class="fw-bold text-capitalize">
          Location:
          {{
            `${news.region?.name} region,  
           ${news.zone?.name} zone`
          }}
          <span v-if="news.woreda">{{ news.woreda + " Woreda " }}</span>
          <span v-if="news.kebele">{{ news.kebele + " Kebele/town" }}</span>
        </p>
        <p class="mb-1">
          {{ news.description.slice(0, 50) }}
        </p>
        <a
          class="d-block text-decoration-none"
          role="button"
          @click="
            this.$router.push({
              name: 'SuccessStoryDetail',
              params: {
                id: news.id,
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
  props: ["news", "index"],
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
    gsap.to("#fadeImage" + this.index, {
      scrollTrigger: {
        trigger: "#fadeImage" + this.index,
        toggleActions: "restart pause resume none",
      },
      opacity: 1,
      y: 0,
      x: 0,
      duration: 0.8,
      delay: this.index * 0.2,
    });
    gsap.to("#fadeDescription" + this.index, {
      scrollTrigger: {
        trigger: "#fadeDescription" + this.index,
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

<style></style>
