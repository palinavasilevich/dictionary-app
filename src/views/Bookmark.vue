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
    <div v-if="bookmars.length">
      <div
        class="bookmarks__word-container word-container"
        v-for="bookmark in paginationBookmars"
        :key="bookmark.id"
      >
        <div class="word-container__content content">
          <router-link
            :to="`/search/${bookmark.word}`"
            style="text-decoration: none; color: #000"
          >
            {{ bookmark.word }}
          </router-link>
          <button class="content_btn" @click="removeBookmark(bookmark.word)">
            x
          </button>
        </div>
      </div>
      <div style="margin-top: 30px">
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
import { defineComponent, computed, ref, watchEffect, ComputedRef } from "vue";
import { useStore } from "vuex";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import IBookmark from "@/types/IBookmark";
import useWordRouter from "@/hooks/useWordRouter";

export default defineComponent({
  name: "bookmarks",
  setup() {
    const store = useStore();

    const bookmars: ComputedRef<any> = computed(
      () => store.getters["word/bookmarks"] as IBookmark[]
    );

    const limitElements = 2;
    const currentPage = ref(1);

    const totalPage = computed(() =>
      Math.ceil(bookmars.length / limitElements)
    );

    const paginationBookmars = computed(() =>
      bookmars.slice(
        (currentPage.value - 1) * limitElements,
        currentPage.value * limitElements
      )
    );

    const changeCurrentPage = (currentPage) => {
      currentPage.value = currentPage;
    };

    const { goBack } = useWordRouter();

    const removeBookmark = (word: string) => {
      store.dispatch("word/REMOVE_BOOKMARK", word);
    };

    return {
      bookmars,
      paginationBookmars,
      faArrowLeft,
      totalPage,
      goBack,
      removeBookmark,
      currentPage,
      changeCurrentPage,
    };
  },
});
</script>
