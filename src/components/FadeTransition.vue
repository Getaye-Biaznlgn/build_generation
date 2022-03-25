<template>
  <transition name="fade" appear mode="in-out">
    <slot />
  </transition>
</template>

<script>
export default {};
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: translateY(300);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 5s;
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(100);
}
</style>
