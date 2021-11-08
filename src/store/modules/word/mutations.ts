import { MutationTree } from "vuex";
import { WordState } from "@/store/modules/word/types";
import IBookmark from "@/types/IBookmark";
import IDefinitions from "@/types/IDefinitions";

export enum MutationType {
  SET_DEFINITIONS = "SET_DEFINITIONS",
  SET_BOOKMARKS = "SET_BOOKMARKS",
  SET_ERROR = "SET_ERROR",
  SET_IS_LOADING = "SET_IS_LOADING",
  ADD_NEW_BOOKMARK = "ADD_NEW_BOOKMARK",
}

export const mutations: MutationTree<WordState> = {
  [MutationType.SET_BOOKMARKS](state, bookmarks: IBookmark) {
    state.bookmarks = bookmarks;
  },

  [MutationType.SET_DEFINITIONS](state, definitions: IDefinitions[]) {
    state.definitions = definitions;
  },

  [MutationType.SET_ERROR](state, payload: string) {
    state.error = payload;
  },

  [MutationType.SET_IS_LOADING](state, payload: boolean) {
    state.isLoading = payload;
  },

  [MutationType.ADD_NEW_BOOKMARK](state, { word, definitions }) {
    state.bookmarks = { ...state.bookmarks, [word]: definitions };
    localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
  },
};
