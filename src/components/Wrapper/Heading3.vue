<template>
  <h3 :class="[className]">{{text}}</h3>
</template>

<script>
export default {
  name: "Heading3",
  props: {
    className: String,
    text: String
  }
};
</script>