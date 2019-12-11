// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import HomePage from "./components/HomePage/HomePage";
import router from "./router";
import { store } from "./store";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "../static/style.css";
import Vuelidate from "vuelidate";

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  render: h => h(HomePage)
});

Vue.use(BootstrapVue);
Vue.use(Vuelidate);
