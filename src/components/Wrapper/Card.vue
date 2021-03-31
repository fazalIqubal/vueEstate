<template>
  <a-card
    :size="size"
    :title="cardTilte"
    :bordered="isBordered"
    :hoverable="isHoverable"
    :loading="isLoading"
    :cover="coverImage"
    :class="[className]"
  >
    <img v-if="coverImage" slot="cover" alt="example" :src="image" />
    <slot />
  </a-card>
</template>

<script>
export default {
  name: "Card",
  props: {
    className: String,
    size: String,
    title: String,
    bordered: Boolean,
    hoverable: Boolean,
    loading: Boolean,
    image: String
  },
  computed: {
    cardTilte() {
      return this.title || "";
    },
    coverImage() {
      return this.image != "" ? true : false;
    },
    isHoverable() {
      return this.hoverable == "true" ? true : false;
    },
    isLoading() {
      return this.loading == "true" ? true : false;
    },
    isBordered() {
      return this.bordered == "true" ? true : false;
    }
  }
};
</script>