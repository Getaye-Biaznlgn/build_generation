<template>
  <nav
    class="navbar navbar-expand-lg py-2 border-2 border-bottom navbar-light bg-white"
  >
    <div class="container-fluid mx-0 p-0">
      <a class="navbar-brand fw-bold" href="#"> Build Together </a>
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
              <select class="mt-2 fw-bold">
                <option selected>Damaged Institution</option>
                <option value="">Healthcare Institution</option>
                <option value="">Educational Institution</option>
              </select>
            </li>

            <li class="nav-item me-2">
              <a
                role="button"
                data-bs-toggle="collapse"
                data-bs-target=".navbar-collapse.show"
                class="nav-link fw-bold"
              >
                How it works</a
              >
            </li>
            <li class="nav-item me-2">
              <a
                role="button"
                data-bs-toggle="collapse"
                data-bs-target=".navbar-collapse.show"
                class="nav-link fw-bold"
                >Success Stories</a
              >
            </li>
            <li class="nav-item me-2">
              <select class="mt-2 fw-bold">
                <option value="en" selected>En</option>
                <option value="amh">Amh</option>
              </select>
            </li>
            <li class="nav-item me-2 mb-2">
              <button
                class="btn fw-bold shadow-sm btn-outline-warning btn-outline px-3 p-1 fw-bold"
              >
                Share
              </button>
            </li>
            <li class="nav-item">
              <button
                class="btn fw-bold rounded bg-warning py-1 px-3 text-light fw-bold"
              >
                Donate
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
<style scoped>
select {
  border: 0px;
  outline: 0px;
}
</style>
