<template>
   <nav class="navbar-light side-bar">
      <ul class="navbar-nav pt-2 px-3">
        <li>
          <router-link class="nav-link py-2 ps-2 fw-bold" :to="{name:'DonatedFund'}">Donated Fund</router-link>
        </li>
        <li>
          <router-link class="nav-link py-2 ps-2 fw-bold" :to="{name:'Coordinator'}">Coordinators</router-link>
        </li>
        <li>
          <div>
            <a class="nav-link py-2 ps-2 collapsible-link  fw-bold pe-2 d-flex justify-content-between" href="#institution" data-bs-toggle="collapse"  role="button" aria-expanded="false" aria-controls="collapseInstitution">
              <span>Damaged Institutions</span>
              <span class="dropdown-icon pt-1"><i class="fas fa-chevron-right"></i></span>
            </a>
          </div>
          <div class="collapse ms-3" id="institution">
            <router-link class="nav-link py-2 px-2 fw-bold d-block" :to="{name:'EducationalInstitution'}">Educational</router-link>
            <router-link class="nav-link py-2 px-2 fw-bold d-block" :to="{name:'HealthCareInstitution'}">Health Care</router-link>
          </div>
         </li>
        <li>
          <div>
            <a class="nav-link py-2 ps-2 collapsible-link  fw-bold pe-2 d-flex justify-content-between" href="#location" data-bs-toggle="collapse"  role="button" aria-expanded="false" aria-controls="collapseInstitution">
              <span>Location</span>
              <span class="dropdown-icon pt-1"><i class="fas fa-chevron-right"></i></span>
            </a>
          </div>
          <div class="collapse ms-3" id="location">
            <router-link class="nav-link py-2 px-2 fw-bold d-block" :to="{name:'Region'}">Region</router-link>
            <router-link class="nav-link py-2 px-2 fw-bold d-block" :to="{name:'Zone'}">Zone</router-link>
          </div>
         </li>
          <li>
          <router-link class="nav-link py-2 ps-2 fw-bold" :to="{name:'SuccessStory'}">Success Stories</router-link>
        </li>
    </ul>  
  </nav>

</template>

<script>
export default {

}
</script>

<style scoped>
  .dropdown-icon{
    transition: all ease 0.23s;
  }
 .collapsible-link[aria-expanded="true"] .dropdown-icon{
   transform:rotate(90deg)
  }
 .active{
   background-color: #fff;
   border-radius: 10px;
 }
</style>