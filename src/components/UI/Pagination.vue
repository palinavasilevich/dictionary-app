<template>
  <div class="pagination">
    <span
      class="pagination__item"
      :class="{ 'active-pagination__item': modelValue === p }"
      v-for="p in totalPage"
      :key="p"
      @click="changeCurrentPage(p)"
      >{{ p }}</span
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "pagination",

  props: {
    totalPage: { type: Number, required: true },
    modelValue: {
      type: Number,
      default: 1,
    },
  },

  setup(_, { emit }) {
    const changeCurrentPage = (numberPage) => {
      emit("update:modelValue", numberPage);
    };

    return { changeCurrentPage };
  },
});
</script>

<style lang="scss" scoped>
.pagination {
  .pagination__item {
    margin-right: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid teal;
    cursor: pointer;
  }

  .pagination__item:hover {
    background: teal;
  }

  .active-pagination__item {
    background: teal;
  }
}
</style>
