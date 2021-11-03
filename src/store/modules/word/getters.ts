import IBookmark from "@/types/IBookmark";
import IDefinitions from "@/types/IDefinitions";
import { GetterTree } from "vuex";
import { WordState } from "./types";

export const getters: GetterTree<WordState, WordState> = {
  definitions(state) {
    return state.definitions as IDefinitions[];
  },

  bookmarks(state) {
    return state.bookmarks as IBookmark;
  },

  error(state) {
    return state.error as string;
  },

  isLoading(state) {
    return state.isLoading as boolean;
  },
};
