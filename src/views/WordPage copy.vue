<template>
  <div class="word-card" v-if="!isLoading">
    <div class="word-card__btns">
      <svg-icon
        :fa-icon="faArrowLeft"
        class="word-card__btn"
        @click="goBack"
      ></svg-icon>
      <svg-icon
        :fa-icon="isBookmark ? activeBookmark : faBookmark"
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
import { defineComponent, onMounted, ref, computed } from "vue";
import useWordRouter from "@/hooks/useWordRouter";
import useFetch, { IState } from "@/hooks/useFetch";

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

  setup() {
    const router = useRouter();
    const { word } = route.params;

    const store = useStore();

    const bookmarks = store.getters["word/bookmarks"];

    const isBookmark = ref(!!bookmarks.filter((b) => b.word === word).length);

    const audio = ref(null);

    // const state: IState = reactive({
    //   data: [],
    //   isError: false,
    //   errorMessage: "",
    //   isLoading: true,
    // });

    // const { data, isLoading, isError, errorMessage, fetchData } = useFetch({
    //   url: `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
    // });

    // const getWordDetails = async () => {
    //   await fetchData();
    //   state.data = data.value as IWord[];
    //   state.isError = isError.value as boolean;
    //   // state.errorMessage = errorMessage.value as string;
    //   state.isLoading = isLoading.value as boolean;
    // };

    onMounted(() => {
      store.dispatch("word/GET_WORD_DETAILS", word);
    });

    const goBack = () => {
      router.go(-1);
    };

    const saveWord = (word) => {
      isBookmark.value = !isBookmark.value;

      if (!bookmarks.filter((b) => b.word === word).length) {
        store.dispatch("word/ADD_BOOKMARK", word);
        console.log(111);
      } else {
        store.dispatch("word/REMOVE_BOOKMARK", word);
      }
    };

    const playAudio = () => {
      (audio.value as any).play();
    };

    return {
      wordDetails: computed(() => store.getters["word/wordDetails"]),
      isLoading: computed(() => store.getters["word/isLoading"]),
      error: computed(() => store.getters["word/error"]),
      faPlayCircle,
      faArrowLeft,
      faBookmark,
      activeBookmark,
      goBack,
      isBookmark,
      saveWord,
      audio,
      playAudio,
    };
  },
});
</script>
