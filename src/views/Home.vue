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
      <search-input v-model="wordQuery" @keypress="onSubmit" />
      <bookmark-button />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "vue-router";
import BookmarkButton from "@/components/BookmarkButton.vue";

export default defineComponent({
  components: { BookmarkButton },
  name: "home-page",

  setup() {
    const wordQuery = ref("");

    const router = useRouter();

    const onSubmit = (e) => {
      if (e.key === "Enter") {
        router.push({ name: "search-word", params: { word: wordQuery.value } });
      }
    };

    return { faBookmark, wordQuery, onSubmit };
  },
});
</script>
