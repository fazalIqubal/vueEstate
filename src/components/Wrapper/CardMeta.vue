<template>
  <a-card-meta :title="title" :description="description" :class="[className]">
    <img v-if="coverImage" slot="cover" alt="example" :src="image" />
    <a-avatar v-if="coverImage" slot="avatar" :src="image" />
  </a-card-meta>
</template>

<script>
export default {
  name: "Image",
  props: {
    className: String,
    title: String,
    image: String,
    description: String
  },
  computed: {
    coverImage() {
      return this.image != "" ? true : false;
    }
  }
};
</script>