import { InjectionKey } from "vue";
import { createStore, Store, StoreOptions } from "vuex";
import common from "./children/common";
import { RootState } from "../types/store";

export const key: InjectionKey<Store<RootState>> = Symbol();

const store = createStore<RootState>({
  state: {
    data: 123
  },
  modules: {
    common
  }
});

export default store;
