<template>
  <div class="word-card">
    <div class="word-card__work-info">
      <svg-icon :fa-icon="faPlayCircle" class="word-btn"></svg-icon>
      <audio ref="audio" :src="wordDetails.phonetics[0].audio"></audio>
      <h2>{{ wordDetails.word }} [{{ wordDetails.phonetics[0].text }}]</h2>
    </div>
    <div class="word-card__word-details word-details">
      <div
        v-for="word in wordDetails.meanings"
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
import { defineComponent, PropType } from "vue";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import IWord from "../types/Word";

export default defineComponent({
  name: "word-card",

  props: {
    wordDetails: {
      type: Object as PropType<IWord>,
      required: true,
    },
  },

  setup() {
    return { faPlayCircle };
  },
});
</script>

<style lang="scss" scoped>
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
}
</style>
