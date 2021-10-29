import axios from "axios";

export const wordDetailsModule = {
  state: () => ({
    wordDetails: [],
    bookmarks: JSON.parse(localStorage.getItem("bookmarks")) || [],
  }),

  getters: {
    wordDetails(state) {
      return state.wordDetails;
    },
    bookmarks(state) {
      return state.bookmarks;
    },
  },
  mutations: {
    setWordDetails(state, payload) {
      state.wordDetails = payload;
    },

    setBookmarks(state, payload) {
      state.bookmarks = payload;
    },
  },

  actions: {
    async getWordDetails({ commit }, word) {
      try {
        const response = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
        commit("setWordDetails", response.data);
        localStorage.setItem("wordDetails", JSON.stringify(response.data));
      } catch (err) {
        console.error(err);
      }
    },

    addBookmark({ commit, getters }, word) {
      const bookmarks = getters.bookmarks.push(word);
      commit("setBookmarks", bookmarks);
      localStorage.setItem("bookmarks", bookmarks);
    },
  },
};
