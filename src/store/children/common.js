// import { createStore } from "vuex";

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
};
