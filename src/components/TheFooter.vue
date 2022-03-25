<template>
  <div class="container-fluid px-0">
    <div class="d-lg-none">
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button
              class="accordion-button fw-bold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              About
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <router-link
                :to="{ name: 'About' }"
                class="d-block ps-0 nav-link text-dark"
                >About</router-link
              >
              <router-link to="/" class="d-block ps-0 nav-link text-dark"
                >How It Works</router-link
              >
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button
              class="accordion-button collapsed fw-bold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Damaged Institution
            </button>
          </h2>
          <div
            id="collapseTwo"
            class="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <router-link
                :to="{ name: 'UserEducationalInstitution' }"
                class="d-block ps-0 nav-link text-dark"
                >Educational Institution</router-link
              >
              <router-link
                :to="{ name: 'UserHealthcareInstitution' }"
                class="d-block ps-0 nav-link text-dark"
                >Healthcare Institution</router-link
              >
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingThree">
            <button
              class="accordion-button collapsed fw-bold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Contact us
            </button>
          </h2>
          <div
            id="collapseThree"
            class="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <p>Phone: +251978567655</p>
              <p>Email: getinfo@buildTogether@gmail</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="d-none d-lg-block d-lg-flex p-3 justify-content-around container-lg"
    >
      <nav>
        <strong class="d-block mb-1">About</strong>
        <router-link
          :to="{ name: 'About' }"
          class="d-block ps-0 nav-link text-dark"
          >About</router-link
        >
        <router-link to="/" class="d-block ps-0 nav-link text-dark"
          >How It Works</router-link
        >
      </nav>
      <nav>
        <strong class="d-block mb-1">Damaged Institution</strong>
        <router-link
          :to="{ name: 'UserEducationalInstitution' }"
          class="d-block ps-0 nav-link text-dark"
          >Educational Institution</router-link
        >
        <router-link
          :to="{ name: 'UserHealthcareInstitution' }"
          class="d-block ps-0 nav-link text-dark"
          >Healthcare Institution</router-link
        >
      </nav>
      <div>
        <strong class="d-block mb-1">Contact us</strong>
        <p>Phone: +251978567655</p>
        <p>Email: getinfo@buildTogether.com</p>
      </div>
    </div>
    <hr />
    <footer class="d-lg-flex text-center container-lg justify-content-between">
      <div class="order-2">
        <a
          href="https://www.facebook.com/horizon_college"
          target="_blank"
          class="fs-5 mx-1 mx-md-2"
          ><i class="fab fa-facebook-square"></i
        ></a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          class="fs-5 mx-1 mx-md-2"
          ><i class="fab fa-twitter-square"></i
        ></a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          class="fs-5 mx-1 mx-md-2"
          ><i class="fab fa-linkedin"></i
        ></a>
        <a
          href="https://www.youtube.com"
          target="_blank"
          class="fs-5 mx-1 mx-md-2"
          ><i class="fab fa-youtube-square bg-youtube"></i
        ></a>
      </div>
      <div class="order-1 fw-bold">
        Copyright &copy;
        {{ new Date().toString().split(" ").slice(3, 4).join(" ") }} -
        BuildTogether
      </div>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.bg-youtube {
  background-color: ff0000 !important;
}
</style>
