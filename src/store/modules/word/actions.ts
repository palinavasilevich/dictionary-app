import { ActionTree } from "vuex";
import axios from "axios";
import { WordState } from "./types";
import IWord from "@/types/Word";

import { MutationType } from "./mutations";

export enum ActionTypes {
  GET_WORD_DETAILS = "GET_WORD_DETAILS",
  ADD_BOOKMARK = "ADD_BOOKMARK",
  REMOVE_BOOKMARK = "REMOVE_BOOKMARK",
}

export const actions: ActionTree<WordState, WordState> = {
  async [ActionTypes.GET_WORD_DETAILS](
    { commit },
    word: string
  ): Promise<void> {
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const wordDetails: IWord = response.data;
      commit(MutationType.SET_WORD_DETAILS, wordDetails);
    } catch (err) {
      console.log(err);
      commit(MutationType.SET_ERROR, err);
    } finally {
      commit(MutationType.SET_IS_LOADING, false);
    }
  },

  [ActionTypes.ADD_BOOKMARK]({ commit, getters }, word: string) {
    const bookmarks = getters.bookmarks;
    bookmarks.push({ id: Date.now(), word });
    commit(MutationType.SET_BOOKMARKS, bookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  },

  [ActionTypes.REMOVE_BOOKMARK]({ commit, getters }, word: string) {
    const bookmarks = getters.bookmarks.filter(
      (bookmark) => bookmark.word !== word
    );

    commit(MutationType.SET_BOOKMARKS, bookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  },
};
