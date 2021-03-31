<template>
  <img :src="source_url" :class="[className]" />
</template>

<script>
export default {
  name: "Image",
  props: {
    className: String,
    source_url: String
  }
};
</script>