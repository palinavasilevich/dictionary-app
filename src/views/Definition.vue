<template>
  <div class="definition" v-if="definitions.length">
    <div class="definition__header header">
      <svg-icon
        :fa-icon="faArrowLeft"
        class="header__btn"
        @click="goBack"
      ></svg-icon>
      <svg-icon
        :fa-icon="isBookmarked ? bookmarkedIcon : bookmarkIcon"
        class="header__btn"
        @click="changeBookmark(definitions[0].word, definitions)"
      ></svg-icon>
    </div>
    <div class="definition__content content">
      <div class="content__word word">
        <svg-icon
          :fa-icon="faPlayCircle"
          class="word__audio-btn"
          @click="playAudio"
        ></svg-icon>
        <audio ref="audio" :src="definitions[0].phonetics[0].audio"></audio>
        <h2>
          {{ definitions[0].word }} [{{ definitions[0].phonetics[0].text }}]
        </h2>
      </div>
      <div>
        <div v-for="(definition, idx) in definitions" :key="idx">
          <div
            v-for="(meaning, index) in definition.meanings"
            :key="index"
            class="content__meaning"
          >
            <h3>{{ meaning.partOfSpeech }}</h3>
            <div
              v-for="(def, defindex) in meaning.definitions"
              :key="def.definition"
            >
              {{ meaning.definitions.length > 1 && `${defindex + 1}. ` }}
              {{ def.definition }}
              <p v-if="def.example">
                <strong>Example: </strong> {{ def.example }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <bookmark-button class="definition__bookmark-btn" />
    </div>
  </div>
  <loader v-else />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

import {
  faPlayCircle,
  faArrowLeft,
  faBookmark as bookmarkedIcon,
} from "@fortawesome/free-solid-svg-icons";

import { faBookmark as bookmarkIcon } from "@fortawesome/free-regular-svg-icons";

import IDefinitions from "@/types/IDefinitions";
import BookmarkButton from "@/components/BookmarkButton.vue";
import IBookmark from "@/types/IBookmark";

export default defineComponent({
  components: { BookmarkButton },
  name: "definition",

  setup() {
    const route = useRoute();
    const { word } = route.params;

    const router = useRouter();
    const goBack = () => {
      router.go(-1);
    };

    const store = useStore();
    const bookmarks = computed(
      (): IBookmark => store.getters["word/bookmarks"]
    );

    const definitions = computed(
      (): IDefinitions[] => store.getters["word/definitions"]
    );

    const isBookmarked = computed(() =>
      Object.keys(bookmarks.value).includes(`${word}`)
    );

    const audio = ref(null);
    const playAudio = () => {
      (audio.value as any).play();
    };

    onMounted(() => {
      store.dispatch("word/GET_DEFINITIONS", word);
    });

    const changeBookmark = (word: string, definitions?: IDefinitions[]) => {
      if (isBookmarked.value) store.dispatch("word/REMOVE_BOOKMARK", word);
      else store.dispatch("word/ADD_BOOKMARK", { word, definitions });
    };

    return {
      definitions,
      isLoading: computed((): boolean => store.getters["word/isLoading"]),
      error: computed((): string => store.getters["word/error"]),
      faPlayCircle,
      faArrowLeft,
      bookmarkedIcon,
      bookmarkIcon,
      isBookmarked,
      audio,
      goBack,
      changeBookmark,
      playAudio,
    };
  },
});
</script>
