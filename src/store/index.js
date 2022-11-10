import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex, axios);

export default new Vuex.Store({
  state: {
    users: [],
  },
  getters: {},
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
  },
  actions: {
    getUsers({ commit }) {
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
          let users = response.data;
          commit("SET_USERS", users);
        });
    },
  },
  modules: {},
});
