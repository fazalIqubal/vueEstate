<template>
  <h2 :class="[className]">{{text}}</h2>
</template>

<script>
export default {
  name: "Heading2",
  props: {
    className: String,
    text: String
  }
};
</script>