<template>
  <the-header></the-header>
  <div class="d-flex">
       <div class="sidebar shadow">
          <the-sidebar></the-sidebar>
        </div>
        <div class="container-fluid content bg-too-light-gray">
           <router-view ></router-view> 
            <div v-if="isItemLoading" class="loading-screen route-loading p-0  position-fixed top-0 start-0 bottom-0 end-0 w-100 h-100">
               <div class="loading-spinner">
                   <img src="../../assets/preloader.gif"   alt="slow connection">
               </div>
            </div>   
        </div>
    </div> 
</template>

<script>
import TheSidebar from '../../components/admin/TheSidebar.vue'
import TheHeader from '../../components/admin/TheHeader.vue'

export default {
   components:{TheSidebar, TheHeader},
  data(){
      return{
          isItemLoading:false,
      }
  }
}
</script>

<style scoped>
  .sidebar{
  background-color: #ECF1FE;
  min-height: 100vh;
  width: 20% !important;
}

</style>

<style>
  table {
  border-collapse: collapse;
  width: 100%;
}
/* new design change start*/
tr:last-child { border-bottom: 2px solid hsl(231, 16%, 91%) }
th{
  text-align: left;
  padding: 8px;
}
tr{
  border-top: 2px solid hsl(231, 16%, 91%)
}
td{
  text-align: left;
  padding: 8px;
  vertical-align: top;
}
</style>

