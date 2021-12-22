import { createStore } from "vuex";
import common from "./children/common";

interface State {
  data: number;
}

export default createStore<State>({
  state: {
    data: 123,
  },
  modules: {
    common,
  },
});
