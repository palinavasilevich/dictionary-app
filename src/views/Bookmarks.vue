<template>
  <div class="bookmarks">
    <div class="bookmarks__header header">
      <svg-icon
        :fa-icon="faArrowLeft"
        class="header__btn"
        @click="goHome"
      ></svg-icon>
      <h2 class="header__title">Bookmarks</h2>
    </div>
    <div v-if="bookmarksValues.length">
      <div
        class="bookmarks__word-container word-container"
        v-for="bookmark in bookmarksForPagination"
        :key="bookmark"
      >
        <div class="word-container__content content">
          <router-link :to="`/search/${bookmark}`" class="bookmarks__link">
            {{ bookmark }}
          </router-link>

          <svg-icon
            :fa-icon="faTimes"
            class="content_btn"
            @click="removeBookmark(bookmark)"
          ></svg-icon>
        </div>
      </div>
      <div class="bookmarks__pagination">
        <pagination
          v-if="totalPage > 1"
          :totalPage="totalPage"
          v-model="currentPage"
          @changeCurrentPage="changeCurrentPage"
        />
      </div>
    </div>
    <p v-else>You haven't added a bookmark to a list yet.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import { faArrowLeft, faTimes } from "@fortawesome/free-solid-svg-icons";

import IBookmark from "@/types/IBookmark";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "bookmarks",
  setup() {
    const store = useStore();
    const router = useRouter();
    const bookmarks = computed(
      (): IBookmark[] => store.getters["word/bookmarks"]
    );

    const bookmarksValues = computed(() => Object.keys(bookmarks.value));
    const limitElements = 5;
    const currentPage = ref(1);

    const totalPage = computed((): number =>
      Math.ceil(bookmarksValues.value.length / limitElements)
    );

    const bookmarksForPagination = computed(() =>
      bookmarksValues.value.slice(
        (currentPage.value - 1) * limitElements,
        currentPage.value * limitElements
      )
    );

    const changeCurrentPage = (currPage) => {
      currentPage.value = currPage;
    };

    const goHome = () => {
      router.push("/");
    };

    const removeBookmark = (word: string) => {
      store.dispatch("word/REMOVE_BOOKMARK", word);
    };

    return {
      bookmarks,
      bookmarksValues,
      bookmarksForPagination,
      faArrowLeft,
      faTimes,
      totalPage,
      goHome,
      removeBookmark,
      currentPage,
      changeCurrentPage,
    };
  },
});
</script>
