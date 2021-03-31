<template>
  <h5 :class="[className]">{{text}}</h5>
</template>

<script>
export default {
  name: "Heading5",
  props: {
    className: String,
    text: String
  }
};
</script>