import Vue from "vue";
import VueI18n from "vue-i18n";
import App from "./app.vue";
import route from "./route";
import store from "./models/index";

Vue.use(VueI18n);

new Vue({
  el: "#app",
  route,
  store,
  render: (h) => h(App),
  mounted() {
    // 在应用被挂载时调用
  },
  created() {
    // 在应用创建时调用
  },
});
