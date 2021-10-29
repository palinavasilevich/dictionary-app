<template>
  <div class="bookmarks">
    <div class="bookmarks__header header">
      <svg-icon
        :fa-icon="faArrowLeft"
        class="header__btn"
        @click="goBack"
      ></svg-icon>
      <h2 class="header__title">Bookmarks</h2>
    </div>

    <div
      class="bookmarks__word-container"
      v-for="bookmark in bookmars"
      :key="bookmark.word"
    >
      <div>BOOKMARS</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "bookmarks",
  setup() {
    const router = useRouter();
    const store = useStore();
    const goBack = () => router.go(-1);

    return {
      faArrowLeft,
      goBack,
      bookmars: computed(() => store.getters.bookmarks),
    };
  },
});
</script>

<style lang="scss" scoped>
.bookmarks {
  margin-top: 30px;
}
.bookmarks__header {
  display: flex;
  align-items: center;

  .header__title {
    margin-left: 10px;
  }
  .header__btn {
    cursor: pointer;
  }
}
.bookmarks__word-container {
  box-shadow: rgb(0 0 0 / 5%) 0px 10px 25px;
  background-color: rgb(255, 255, 255);
  padding: 16px;
  border-radius: 8px;
  margin-top: 24px;
}
</style>
