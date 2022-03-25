import { createStore } from "vuex";
import region from "./region";
import zone from "./zone";
import auth from "./auth";

export default createStore({
  modules: {
    region,
    zone,
    auth,
  },
  state: {
    isLoading: false,
    //to store each detail, it should be passed on as a param
    institution: "",
    lang: "en",
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
    institution(state) {
      return state.institution;
    },
    lang(state) {
      return state.lang;
    },
  },
  mutations: {
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
    setLang(state, lang) {
      state.lang = lang;
    },
    setInstitution(state, payload) {
      state.institution = payload;
    },
  },
  actions: {},
});
