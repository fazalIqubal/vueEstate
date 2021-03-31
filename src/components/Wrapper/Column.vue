<template>
  <a-col :span="span"   :class="[className]">
    <slot />
  </a-col>
</template>

<script>
export default {
  name: "Column",
  props: {
    className: String,
    span: String,
    offset: Number,
    order: Number
  }
};
</script>