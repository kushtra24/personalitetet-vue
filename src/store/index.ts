import { createStore } from 'vuex';
// import { getters } from './getters';
// import { actions } from './actions';
// import { mutations } from './mutations';
import { state } from './state'

export const store = createStore({
  // state: {},
  state,
  // getters,
  actions: {
    sectionLink: ({ commit }, payload) => {
      commit('selectionLink', payload);
    }
  },
  mutations: {
    selectionLink: (state, payload) => {
      state.homeRoute = payload
    }
  },
  getters: {
    getHomeRoute: (state) => {
      return state.homeRoute;
    }
  }
  // actions,
  // mutations,
});