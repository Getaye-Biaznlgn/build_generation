import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import BaseCard from "./components/admin/BaseCard.vue";
import BaseModal from "./components/admin/BaseModal.vue";
import BaseButton from "./components/admin/BaseButton.vue";
import i18n from "./i18n";
const app = createApp(App);

app.component("BaseCard", BaseCard);
app.component("BaseModal", BaseModal);
app.component("BaseButton", BaseButton);
app.use(store).use(i18n).use(router).mount("#app");
