import { createApp } from "vue";
import I18n from "./i18n";
import App from "./app.vue";
import route from "./route";
import store from "./models/index";

createApp().use(I18n);

createApp(App).use(store).use(route).mount("#app");
