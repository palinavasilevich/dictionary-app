<template>
  <router-link class="bookmark-btn" :to="{ name: 'bookmarks' }"
    ><svg-icon :fa-icon="faBookmark"></svg-icon
  ></router-link>
</template>

<script>
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
export default {
  setup() {
    return { faBookmark };
  },
};
</script>
