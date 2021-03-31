<template>
  <label :class="[className]">{{text}}</label>
</template>

<script>
export default {
  name: "CXLabel",
  props: {
    className: String,
    text: String
  }
};
</script>