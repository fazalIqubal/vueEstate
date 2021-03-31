<template>
  <h6 :class="[className]">{{text}}</h6>
</template>

<script>
export default {
  name: "Heading6",
  props: {
    className: String,
    text: String
  }
};
</script>