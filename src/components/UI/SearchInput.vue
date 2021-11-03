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

  setup() {
    return { faSearch };
  },
});
</script>
