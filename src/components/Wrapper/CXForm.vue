<template>
  <form :class="[className]" @submit.prevent="processForm">
    <slot />
  </form>
</template>

<script>
export default {
  name: "CXForm",
  props: {
    className: String,
    processForm : Function
  }
};
</script>