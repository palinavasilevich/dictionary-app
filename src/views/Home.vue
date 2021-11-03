<template>
  <div class="home-page">
    <div class="home-page__container">
      <img
        src="https://chapterone.qodeinteractive.com/wp-content/uploads/2019/07/home-5-single-image-3.png"
        alt="logo"
        class="home-page__img"
      />
      <h1>English Dictionary</h1>
      <p>Find meanings and save for quick reference</p>
      <p class="search-error">{{ errorMessage }}</p>
      <search-input
        v-model="wordQuery"
        @keypress="onSubmit"
        :class="{ 'input-error': !isValid }"
      />
      <p v-if="!isValid" class="search-error">This field is required</p>
      <bookmark-button />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref, watchEffect, watch } from "vue";
import { useRouter } from "vue-router";
import BookmarkButton from "@/components/BookmarkButton.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { BookmarkButton },
  name: "home-page",

  setup() {
    const wordQuery = ref("");
    const errorMessage = ref("");
    const isValid = ref(true);
    const router = useRouter();
    const store = useStore();

    const error = computed(() => store.getters["word/error"]);

    watch(wordQuery, () => {
      isValid.value = true;
      errorMessage.value = "";
    });

    const onSubmit = async (e) => {
      if (!wordQuery.value) {
        isValid.value = false;
        return;
      }
      if (e.key === "Enter") {
        await store.dispatch("word/GET_DEFINITIONS", wordQuery.value);
        if (error.value) {
          console.log(error.value);
          errorMessage.value = `Sorry, but we couldn't find definitions for the word "${wordQuery.value}"`;
        } else {
          router.push(`/search/${wordQuery.value}`);
        }
      }
    };

    return { wordQuery, errorMessage, isValid, onSubmit };
  },
});
</script>
