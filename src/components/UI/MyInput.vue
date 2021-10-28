<template>
  <input
    class="my-input"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  name: "my-input",
  props: {
    modelValue: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.my-input {
  border: 1px solid #ddd;
  padding: 10px 15px;
  outline: none;
  font-size: 1.2rem;
}
</style>
