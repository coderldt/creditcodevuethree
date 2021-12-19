import CommonBox from "./commonBox/index.vue";
import Echarts from "./echarts/index.vue";
import * as ElIconModules from "@element-plus/icons";
import { App } from "vue";

export default function globalCommonComponents(app: App<Element>) {
  Object.entries(ElIconModules).map(([key, value]) => {
    app.component(key, value);
  });
  app.component("CommonBox", CommonBox);
  app.component("Echarts", Echarts);
}
