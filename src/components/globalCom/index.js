import CommonBox from "./commonBox/index.vue";
import * as ElIconModules from "@element-plus/icons";

export default function globalCommonComponents(app) {
  Object.entries(ElIconModules).map(([key, value]) => {
    app.component(key, value);
  });
  app.component("CommonBox", CommonBox);
}
