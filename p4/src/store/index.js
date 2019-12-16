import Vue from "vue";
import Vuex from "vuex";
import axios from "../axios";
import {
  getJSONFromLocalStorage,
  messageDataKey,
  playerDataKey
} from "../helpers/commons/constants";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    playerName: null,
    profileCollections: null,
    messageCount: null
  },
  mutations: {
    setPlayerName: (state, payload) => {
      state.playerName = payload;
    },
    setMessageCount: (state, payload) => {
      state.messageCount = payload;
    },
    setProfileCollections: (state, payload) => {
      state.profileCollections = payload;
    },
    updateMessageCount: (state, payload) => {
      state.messageCount += payload;
    }
  },
  actions: {
    setPlayerName: ({ commit }) => {
      const { name } = getJSONFromLocalStorage(playerDataKey);
      if (name) {
        commit("setPlayerName", name);
      }
    },
    setMessageCount: ({ commit }) => {
      const existingConversations = getJSONFromLocalStorage(messageDataKey);
      if (!existingConversations) {
        commit("setMessageCount", 0);
      } else {
        const messageBadge = existingConversations.filter(convo => !convo.read)
          .length;
        commit("setMessageCount", messageBadge);
      }
    },
    setProfileCollections: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios
          .get("/profiles.json")
          .then(res => {
            commit("setProfileCollections", res.data);
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
});
