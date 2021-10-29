<template>
  <div class="word-card" v-if="!isLoading">
    <div class="word-card__btns">
      <svg-icon
        :fa-icon="faArrowLeft"
        class="word-card__btn"
        @click="goBack"
      ></svg-icon>
      <svg-icon
        :fa-icon="!isBookmark ? activeBookmark : faBookmark"
        class="word-card__btn"
        @click="saveWord(wordDetails[0].word)"
      ></svg-icon>
    </div>
    <div class="word-card__work-info">
      <svg-icon
        :fa-icon="faPlayCircle"
        class="word-btn"
        @click="playAudio"
      ></svg-icon>
      <audio ref="audio" :src="wordDetails[0].phonetics[0].audio"></audio>
      <h2>
        {{ wordDetails[0].word }} [{{ wordDetails[0].phonetics[0].text }}]
      </h2>
    </div>
    <div class="word-card__word-details word-details">
      <div
        v-for="word in wordDetails[0].meanings"
        :key="word.partOfSpeech"
        class="word-details__container"
      >
        <h3>{{ word.partOfSpeech }}</h3>
        <div v-for="(definition, index) in word.definitions" :key="index">
          {{ word.definitions.length > 1 ? `${index + 1}.` : "" }}
          {{ definition.definition }}
          <p>
            <strong v-if="definition.example">Example: </strong>
            {{ definition.example }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  onMounted,
  ref,
  toRefs,
  reactive,
  computed,
} from "vue";

import useFetch from "@/hooks/useFetch";

import {
  faPlayCircle,
  faArrowLeft,
  faBookmark as activeBookmark,
} from "@fortawesome/free-solid-svg-icons";

import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import IWord from "../types/Word";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "word-card",

  props: {
    wordDetails: {
      type: Object as PropType<IWord>,
      required: true,
    },
  },

  setup() {
    const route = useRoute();
    const router = useRouter();

    const store = useStore();

    const audio = ref({});
    const state = reactive({
      wordDetails: <any>[],
      isError: false,
      errorMessage: "",
      isLoading: true,
    });

    const { data, isLoading, isError, errorMessage, fetchData } = useFetch({
      url: `https://api.dictionaryapi.dev/api/v2/entries/en/${route.params.word}`,
    });

    onMounted(async () => {
      await fetchData();

      state.wordDetails = data.value;
      state.isError = isError.value;
      //   state.errorMessage = errorMessage.value;
      state.isLoading = isLoading.value;
    });

    const goBack = () => {
      router.go(-1);
    };

    const playAudio = () => {
      //   audio.value.play();
    };

    const saveWord = (word) => {
      isBookmark.value = !isBookmark.value;

      //   if (!store.getters.bookmarks.incudes(word)) {
      //     store.dispatch("addBookmark", word);
      //   }

      console.log(store.getters.bookmarks);
    };

    const isBookmark = ref(true);

    return {
      faPlayCircle,
      faArrowLeft,
      faBookmark,
      activeBookmark,
      audio,
      playAudio,
      ...toRefs(state),
      goBack,
      isBookmark,
      saveWord,
    };
  },
});
</script>

<style lang="scss" scoped>
.word-card {
  margin-top: 30px;
}
.word-card__work-info {
  display: flex;
  justify-content: center;
  align-items: center;
}

.word-details__container {
  box-shadow: rgb(0 0 0 / 5%) 0px 10px 25px;
  background-color: rgb(255, 255, 255);
  padding: 16px;
  border-radius: 8px;
  margin-top: 24px;
}

.word-btn {
  margin-right: 10px;
  cursor: pointer;
}

.word-card__btns {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .word-card__btn {
    font-size: 1.5rem;
    cursor: pointer;
  }

  .bookmark {
  }
}
</style>
