import IBookmark from "@/types/IBookmark";
import IWord from "@/types/Word";
import { GetterTree } from "vuex";
import { WordState } from "./types";

export const getters: GetterTree<WordState, WordState> = {
  wordDetails(state) {
    return state.wordDetails as IWord[];
  },
  bookmarks(state) {
    return state.bookmarks as IBookmark[];
  },

  error(state) {
    return state.error as string;
  },
  isLoading(state) {
    return state.isLoading as boolean;
  },
};
