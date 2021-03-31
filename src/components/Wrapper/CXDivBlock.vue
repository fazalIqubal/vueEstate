<template>
  <div :class="[className]">
    {{text}}
    <slot />
  </div>
</template>

<script>
export default {
  name: "CXDivBlock",
  props: {
    className: String,
    text: String
  }
};
</script>