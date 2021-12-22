// import { createStore } from "vuex";

import { useStore } from 'vuex';
const state: useStore = {
  isLogin: true,
};

export default {
  namespaced: true,
  state: {
    collapse: true,
  },
  mutations: {
    onCollapseChange(state: useState): void {
      state.collapse = !state.collapse;
    },
  },
  actions: {
    onCollapseChange({ commit }) {
      commit("onCollapseChange");
    },
  },
};
