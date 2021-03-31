<template>
  <input
    :class="[className, 'cx-input','ant-input']"
    :name="name"
    :type="type"
    :value="value"
    :placeholder="placeholder"
    @change="onChange"
  />
</template>

<script>
export default {
  name: "CXInput",
  props: {
    className: String,
    inputTextChange: Function,
    value: String,
    name: String,
    type: {
      type: String,
      default: "text"
    },
    placeholder: String
  },
  methods: {
    onChange(e) {
      if (this.inputTextChange && this.type != "checkbox") {
        this.inputTextChange(this.name, e.target.value, e);
      } else if (this.inputTextChange && this.type == "checkbox") {
        this.inputTextChange(this.name, e.target.checked, e);
      }
    }
  }
};
</script>