import Vue from 'vue';
import App from './app.vue';
import router from './router';
import store from './models/index';

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  mounted() {
    // 在应用被挂载时调用
  },
  created() {
    // 在应用创建时调用
  }
});