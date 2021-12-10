import { createStore } from "vuex";
import common from "./children/common";

export default createStore({
  state: {
    data: 123,
  },
  modules: {
    common,
  },
});
