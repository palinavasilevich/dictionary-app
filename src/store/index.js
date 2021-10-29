import { createStore } from "vuex";

import { wordDetailsModule } from "@/store/wordDetailsModule";

export default createStore({
  modules: {
    wordDetails: wordDetailsModule,
  },
});
