<template>
  <a-row :class="[className]">
    <slot />
  </a-row>
</template>

<script>
export default {
  name: "Row",
  props: {
    className: String
  }
};
</script>