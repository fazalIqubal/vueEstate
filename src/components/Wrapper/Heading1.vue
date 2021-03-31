<template>
  <h1 :class="[className]">{{text}}</h1>
</template>

<script>
export default {
  name: "Heading1",
  props: {
    className: String,
    text: String
  }
};
</script>