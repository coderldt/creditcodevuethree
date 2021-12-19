// import { createStore } from "vuex";

import { StoreOptions } from "vuex";

export default {
  namespaced: true,
  state: {
    collapse: true,
  },
  mutations: {
    onCollapseChange(state) {
      state.collapse = !state.collapse;
    },
  },
  actions: {
    onCollapseChange({ commit }) {
      commit("onCollapseChange");
    },
  },
} as StoreOptions<any>;
