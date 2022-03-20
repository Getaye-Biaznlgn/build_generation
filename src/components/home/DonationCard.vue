<template>
  <div class="p-3 shadow-lg bg-white rounded">
    <div class="small fw-bold">$32,000 USD Raised</div>
    <hr class="my-2" />
    <div class="small mb-3">160 donors</div>
    <div class="d-grid gap-2">
      <button class="btn btn-light-warning fw-bold" type="button">Share</button>
      <button class="btn btn-warning fw-bold" type="button">Donate Now</button>
    </div>
    <ul class="navbar-nav my-3">
      <li class="nav-item" v-for="n in 3" :key="n">
        <div class="d-flex">
          <span class="fs-3 pe-3 pt-1">
            <i class="fas fa-user-circle"></i>
          </span>
          <div>
            <div>Yohanis Abebe</div>
            <span class="small">{{ "$100  .4days" }} </span>
          </div>
        </div>
        <hr class="my-2" />
      </li>
    </ul>
    <div class="d-flex justify-content-between">
      <button class="btn text-success fw-bold border">See All</button>
      <button class="btn border fw-bold">
        <i class="fa fa-star-o" aria-hidden="true"></i>
        See top donation
      </button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.btn-light-warning {
  background-color: rgba(255, 193, 7, 0.486);
}
</style>
