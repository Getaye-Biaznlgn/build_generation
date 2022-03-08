<template>
     <div class="col-md-3 mx-auto border rounded-1 px-3 pt-3 mt-5">
       <h3 class="mt-2 mx-auto">Build Generation</h3>
          
       <!-- loign form -->
       <form v-if="!isForgotSelected" class=" pt-3" @submit.prevent="login">
        <div class="mb-2" :class="{warining:v$.userCrediantail.email.$error}">
          <label for="#name" class="form-label">Email</label>
          <input class="form-control" v-model="userCrediantail.email"  id="name" type="text" aria-label=".form-control-lg">
          <span class="error-msg mt-1"  v-for="(error, index) of v$.userCrediantail.email.$errors" :key="index">{{ error.$message+", " }}</span>

        </div>
         <div class="mb-4" :class="{warining:v$.userCrediantail.password.$error}">
          <label for="#password" class="form-label">Password</label>
           <div class="d-flex position-relative">
               <input class="form-control" v-model="userCrediantail.password" id="password" :type="isPasswordVisible?'text':'password'"  aria-label=".form-control-lg">
               <i @click="toggleShowPassword" class="position-absolute end-0 mx-2 mt-2  far " :class="isPasswordVisible ? 'fa-eye': 'fa-eye-slash'"></i>
           </div>
          <span class="error-msg mt-1"  v-for="(error, index) of v$.userCrediantail.password.$errors" :key="index">{{ error.$message+", " }}</span>
        </div>

        <div class="d-grid gap-2">
           <button  class="btn text-white" type="submit">
             <span v-if="isLoging">
                <span  class="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
                <span>Signing</span> 
             </span>
             <span v-else>Sign in</span> 
           </button>
           <p class="text-danger text-center small">{{notify}}</p>
        </div>
       </form>


       <!-- forgot password form -->
       <form v-if="isForgotSelected" class=" pt-3" @submit.prevent="login">
        <div class="mb-2" :class="{warining:v$.userCrediantail.email.$error}">
          <label for="#name" class="form-label">Email</label>
          <input class="form-control" v-model="userCrediantail.email"  id="name" type="text" aria-label=".form-control-lg">
          <span class="error-msg mt-1"  v-for="(error, index) of v$.userCrediantail.email.$errors" :key="index">{{ error.$message+", " }}</span>
        </div>
         
        <div  class="d-grid gap-2">
           <button  class="btn text-white" type="submit">
             <span v-if="isLoging">
                <span  class="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
                <span>...</span> 
             </span>
             <span v-else>Forgot password</span> 
           </button>
           <p class="text-danger text-center small">{{notify}}</p>
        </div>
       </form>
       <a v-if="!isForgotSelected"  role="button" @click="toggleFormType" class=" ms-auto nav-link">Forgot password</a>
       <a v-if="isForgotSelected"  role="button" @click="toggleFormType" class=" ms-auto nav-link">Login</a>

    </div>
</template>

<script>
import {required,helpers} from '@vuelidate/validators'
import useValidate from '@vuelidate/core'
import apiClient from '../../resources/baseUrl'
export default {
    data(){
     return{
       isForgotSelected:false,
       v$:useValidate(),
       userCrediantail:{
         email:'',
         password:''
       },
       isPasswordVisible:false,
       isLoging:false,
       notify:''
     }
  },
  validations(){
      return{
        userCrediantail:{
          email:{
            required:helpers.withMessage('Email can\'t be empty', required )
          },
          password:{
            required:helpers.withMessage('Password can\'t be empty', required )
          }
        }
      }
  },
  methods:{
    toggleFormType(){
        this.isForgotSelected = !this.isForgotSelected
    },
    toggleShowPassword(){
       this.isPasswordVisible=!this.isPasswordVisible
    },
   async login(){
    this.notify=''
     this.v$.$validate()
  if(!this.v$.$error){
    this.isLoging=true
    try{
      var response= await apiClient.post('/api/login', this.userCrediantail)
      if(response.status === 200){
        // let toPath= this.$route.query.to || '/staff'
        apiClient.defaults.headers.common['Authorization'] =`Bearer ${response.data.access_token}`
        this.$store.commit('setToken', response.data.access_token)
        this.$store.commit('setUser', response.data.user)
        this.$store.commit('setIsAuthenticated', true)
        let user=response.data.user
       
        localStorage.setItem('tokenB', response.data.access_token)
        localStorage.setItem('user', JSON.stringify(user)) 
       
        let toPath= this.$router.to || '/admin'
        this.$router.push(toPath)
      }else{
        throw 'faild'+response.status
      }
    }catch(e){
      this.notify= 'Faild to login, check your email and password'
    }finally{
      this.isLoging=false
    }
       }
    }
  
  }
}
</script>
<style scoped>
  .btn{
      background-color: #2f4587;
  }
  .warining input{
    border: 1px red solid;
  }
  .warining span{
    display: inline;
    color: red;
    font-size: 14px;
  }

form i {
    /* margin-bottom: -1000px; */
    cursor: pointer;
}
  
</style>