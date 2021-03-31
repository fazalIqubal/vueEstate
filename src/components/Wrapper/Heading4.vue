<template>
  <h4 :class="[className]">{{text}}</h4>
</template>

<script>
export default {
  name: "Heading4",
  props: {
    className: String,
    text: String
  }
};
</script>