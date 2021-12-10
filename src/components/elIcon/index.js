import * as ElIconModules from "@element-plus/icons";

export default function globalIconComponents(app) {
  Object.entries(ElIconModules).map(([key, value]) => {
    app.component(key, value);
  });
}
