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
      <router-link class="home-page__bookmark-btn" :to="{ name: 'bookmarks' }"
        ><svg-icon :fa-icon="faBookmark"></svg-icon
      ></router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "home-page",
  setup() {
    const wordQuery = ref("");

    const router = useRouter();

    const onSubmit = (e) => {
      if (e.key === "Enter") {
        router.push({ name: "search-word", params: { word: wordQuery.value } });
      }
    };

    return { wordQuery, onSubmit, faBookmark };
  },
});
</script>

<style lang="scss" scoped>
.home-page__container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .home-page__img {
    // height: 200px;
  }

  .home-page__bookmark-btn {
    margin: 48px 0 0;
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 8px;
    background: linear-gradient(
      138.72deg,
      rgb(220, 130, 149) 0%,
      rgb(220, 104, 124) 95.83%
    );
    box-shadow: rgb(221 114 133 / 20%) 0px 10px 10px;
    color: rgb(255, 255, 255);
    padding: 16px;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
  }
}
</style>
