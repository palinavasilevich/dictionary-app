<template>
  <div class="search-input">
    <svg-icon :fa-icon="faSearch" class="search-input__icon"> </svg-icon>
    <input
      class="input"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
export default defineComponent({
  name: "search-input",
  props: {
    type: {
      type: String,
      default: "text",
    },

    placeholder: {
      type: String,
    },

    modelValue: {
      type: String,
    },
  },

  // emits: { findWord },

  setup(props, { emit }) {
    return { faSearch };
  },
});
</script>

<style lang="scss" scoped>
.search-input {
  cursor: text;
  display: inline-flex;
  align-items: center;
  width: 100%;
  position: relative;
  transition: background-color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  padding-left: 12px;
  margin-top: 32px;
  border-radius: 8px;
  background-color: white;
  box-shadow: rgb(0 0 0 / 5%) 0px 10px 25px;

  .input {
    width: 100%;
    border: none;
    padding: 10px 15px;
    border-radius: 8px;
    outline: none;
    font-size: 1.2rem;
  }

  .search-input__icon {
    color: rgba(0, 0, 0, 0.26);
  }
}
</style>
