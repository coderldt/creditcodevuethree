import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/assets/css/index.less";
import "@/assets/css/common.less";

import globalCommonComponents from "@/components/globalCom";

const app = createApp(App);
app.use(ElementPlus);

globalCommonComponents(app);
app.use(store).use(router).mount("#app");
