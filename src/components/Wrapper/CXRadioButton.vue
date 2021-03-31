<template>
  <a-radio-group :options="options" :name="name" :default-value="value" @change="onChange" />
</template>

<script>
export default {
  name: "CXRadioButton",
  props: {
    className: String,
    inputTextChange: Function,
    options: Array,
    value: String,
    name: String,
  },
  methods: {
    onChange(e) {
      if (this.inputTextChange) {
        this.inputTextChange(this.name, e.target.value, e);
      }
    }
  }
};
</script>
<style>
.cx-date-picker {
  width: 100%;
}
</style>
