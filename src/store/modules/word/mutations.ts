import { MutationTree } from "vuex";
import { WordState } from "@/store/modules/word/types";
import IBookmark from "@/types/IBookmark";
import IWord from "@/types/Word";

export enum MutationType {
  SET_WORD_DETAILS = "SET_WORD_DETAILS",
  SET_BOOKMARKS = "SET_BOOKMARKS",
  SET_ERROR = "SET_ERROR",
  SET_IS_LOADING = "SET_IS_LOADING",
}

export const mutations: MutationTree<WordState> = {
  [MutationType.SET_BOOKMARKS](state, bookmarks: IBookmark[]) {
    state.bookmarks = bookmarks;
  },

  [MutationType.SET_WORD_DETAILS](state, data: IWord[]) {
    state.wordDetails = data;
  },

  [MutationType.SET_ERROR](state, payload: string) {
    state.error = payload;
  },

  [MutationType.SET_IS_LOADING](state, payload: boolean) {
    state.isLoading = payload;
  },
};
