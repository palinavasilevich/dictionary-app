import { Module } from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { WordState } from "./types";

export const state: WordState = {
  wordDetails: [],
  bookmarks: JSON.parse(localStorage.getItem("bookmarks")!) || [],
  error: "",
  isLoading: true,
};

const namespaced: boolean = true;

export const word: Module<WordState, WordState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
