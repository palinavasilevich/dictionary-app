import { ActionTree } from "vuex";
import axios from "axios";
import { WordState } from "./types";
import IDefinitions from "@/types/IDefinitions";

import { MutationType } from "./mutations";

export enum ActionTypes {
  GET_DEFINITIONS = "GET_DEFINITIONS",
  ADD_BOOKMARK = "ADD_BOOKMARK",
  REMOVE_BOOKMARK = "REMOVE_BOOKMARK",
}

export const actions: ActionTree<WordState, WordState> = {
  async [ActionTypes.GET_DEFINITIONS](
    { commit, getters },
    word: string
  ): Promise<void> {
    commit(MutationType.SET_ERROR, "");
    commit(MutationType.SET_IS_LOADING, true);

    const isBookmarked = Object.keys(getters.bookmarks).includes(word);

    if (!isBookmarked) {
      try {
        const response = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
        const definitions: IDefinitions = response.data;
        commit(MutationType.SET_DEFINITIONS, definitions);
      } catch (err) {
        console.log(err);
        commit(MutationType.SET_ERROR, err);
      } finally {
        commit(MutationType.SET_IS_LOADING, false);
      }
    } else {
      commit(MutationType.SET_DEFINITIONS, getters.bookmarks[word]);
    }
  },

  [ActionTypes.ADD_BOOKMARK]({ commit, getters }, payload) {
    commit(MutationType.ADD_NEW_BOOKMARK, payload);
  },

  [ActionTypes.REMOVE_BOOKMARK]({ commit, getters }, word: string) {
    const { [word]: _, ...other } = getters.bookmarks;

    commit(MutationType.SET_BOOKMARKS, other);
    localStorage.setItem("bookmarks", JSON.stringify(getters.bookmarks));
  },
};
