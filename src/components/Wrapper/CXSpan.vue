<template>
  <span :class="[className]">
    {{text}}
    <slot />
  </span>
</template>

<script>
export default {
  name: "CXSpan",
  props: {
    className: String,
    text: String
  }
};
</script>