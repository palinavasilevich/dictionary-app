import { createStore } from "vuex";

import { word } from "@/store/modules/word";

export default createStore({
  modules: {
    word,
  },
});
