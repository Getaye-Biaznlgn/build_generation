import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import BaseCard from './components/admin/BaseCard.vue' 

const app=createApp(App)
app.component('BaseCard', BaseCard)
app.use(store).use(router).mount("#app");
