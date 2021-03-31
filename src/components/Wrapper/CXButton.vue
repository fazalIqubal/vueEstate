<template>
  <a-button
    :type="type"
    :shape="shape"
    :htmlType="htmlType"
    :labelAlign="labelAlign"
    :loading="isLoading"
    :block="isBlock"
    :class="[className]"
  >{{label}}</a-button>
</template>

<script>
export default {
  name: "CXButton",
  props: {
    className: String,
    label: String,
    type: String,
    shape: String,
    loading: String,
    block: String,
    htmlType: String,
    labelAlign: String
  },
  computed: {
    isLoading() {
      return this.loading == "true" ? true : false;
    },
    isBlock() {
      return this.block == "true" ? true : false;
    },
    shapeVal() {
      return this.shape != "" ? this.shape : null;
    }
  }
};
</script>