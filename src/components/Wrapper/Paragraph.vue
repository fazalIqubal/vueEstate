<template>
  <p :class="[className]">{{text}}</p>
</template>

<script>
export default {
  name: "Paragraph",
  props: {
    className: String,
    text: String
  }
};
</script>